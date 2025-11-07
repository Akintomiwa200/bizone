import Business from '../models/Business.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const analyticsService = {
  // Get comprehensive business analytics
  async getBusinessAnalytics(businessId) {
    try {
      // Convert to ObjectId if it's a string
      const businessObjectId = typeof businessId === 'string' 
        ? new mongoose.Types.ObjectId(businessId) 
        : businessId;
      
      const business = await Business.findById(businessObjectId);
      if (!business) {
        throw new Error('Business not found');
      }

      // Get date ranges
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const thisWeek = new Date(today);
      thisWeek.setDate(thisWeek.getDate() - 7);
      const thisMonth = new Date(today);
      thisMonth.setMonth(thisMonth.getMonth() - 1);
      const thisYear = new Date(today);
      thisYear.setFullYear(thisYear.getFullYear() - 1);

      // Get orders statistics
      const totalOrders = await Order.countDocuments({ business: businessObjectId });
      const todayOrders = await Order.countDocuments({ 
        business: businessObjectId, 
        createdAt: { $gte: today } 
      });
      const weekOrders = await Order.countDocuments({ 
        business: businessObjectId, 
        createdAt: { $gte: thisWeek } 
      });
      const monthOrders = await Order.countDocuments({ 
        business: businessObjectId, 
        createdAt: { $gte: thisMonth } 
      });

      // Get revenue statistics
      const orders = await Order.find({ business: businessObjectId });
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const todayRevenue = orders
        .filter(order => order.createdAt >= today)
        .reduce((sum, order) => sum + (order.total || 0), 0);
      const weekRevenue = orders
        .filter(order => order.createdAt >= thisWeek)
        .reduce((sum, order) => sum + (order.total || 0), 0);
      const monthRevenue = orders
        .filter(order => order.createdAt >= thisMonth)
        .reduce((sum, order) => sum + (order.total || 0), 0);

      // Get product statistics
      const totalProducts = await Product.countDocuments({ 
        business: businessObjectId, 
        status: 'active' 
      });
      const lowStockProducts = await Product.countDocuments({ 
        business: businessObjectId,
        'inventory.trackQuantity': true,
        $expr: { 
          $lte: ['$inventory.quantity', '$inventory.lowStockAlert'] 
        }
      });

      // Get order status breakdown
      const orderStatuses = await Order.aggregate([
        { $match: { business: businessObjectId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);

      // Get top selling products
      const topProducts = await Order.aggregate([
        { $match: { business: businessObjectId } },
        { $unwind: '$items' },
        { $group: { 
          _id: '$items.product', 
          quantity: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.total' }
        }},
        { $sort: { quantity: -1 } },
        { $limit: 10 },
        { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }},
        { $unwind: '$product' },
        { $project: {
          productName: '$product.name',
          quantity: 1,
          revenue: 1
        }}
      ]);

      return {
        overview: {
          totalOrders,
          todayOrders,
          weekOrders,
          monthOrders,
          totalRevenue,
          todayRevenue,
          weekRevenue,
          monthRevenue,
          totalProducts,
          lowStockProducts
        },
        orderStatuses,
        topProducts,
        business: {
          name: business.name,
          category: business.category,
          rating: business.stats.averageRating
        }
      };
    } catch (error) {
      throw new Error(`Error fetching analytics: ${error.message}`);
    }
  }
};

