import Delivery from '../models/Delivery.js';
import Rider from '../models/Rider.js';
import { notificationService } from './notificationService.js';

export const deliveryService = {
  // Find available riders near pickup location
  async findAvailableRiders(pickupLocation, maxDistance = 5) {
    try {
      const riders = await Rider.find({
        status: 'available',
        isActive: true,
        isVerified: true,
        'currentLocation.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [pickupLocation.lng, pickupLocation.lat]
            },
            $maxDistance: maxDistance * 1000 // meters
          }
        }
      }).populate('user', 'name phone').sort({ 'rating.average': -1 });

      return riders;
    } catch (error) {
      throw new Error(`Error finding riders: ${error.message}`);
    }
  },

  // Assign rider to delivery
  async assignRider(deliveryId, riderId) {
    try {
      const delivery = await Delivery.findById(deliveryId);
      const rider = await Rider.findById(riderId).populate('user', 'name phone');

      if (!delivery || !rider) {
        throw new Error('Delivery or rider not found');
      }

      if (rider.status !== 'available') {
        throw new Error('Rider is not available');
      }

      delivery.rider = riderId;
      delivery.status = 'assigned';
      delivery.updates.push({
        status: 'assigned',
        note: `Rider ${rider.user?.name || 'Unknown'} assigned to delivery`,
        timestamp: new Date()
      });

      rider.status = 'on-delivery';
      rider.currentDelivery = deliveryId;

      await Promise.all([delivery.save(), rider.save()]);

      // Notify rider
      if (rider.user?.phone) {
        await notificationService.sendDeliveryAssignment(rider.user.phone, delivery);
      }

      return delivery;
    } catch (error) {
      throw new Error(`Error assigning rider: ${error.message}`);
    }
  },

  // Calculate delivery ETA
  async calculateETA(pickupLocation, dropoffLocation) {
    // In production, use Google Maps Distance Matrix API
    const distance = this.calculateDistance(pickupLocation, dropoffLocation);
    const averageSpeed = 25; // km/h in city traffic
    const baseTime = 15; // minutes for pickup and dropoff
    
    const travelTime = (distance / averageSpeed) * 60; // minutes
    return Math.round(baseTime + travelTime);
  },

  // Calculate distance between two points
  calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // Update delivery status
  async updateDeliveryStatus(deliveryId, status, note = '', riderLocation = null) {
    try {
      const delivery = await Delivery.findById(deliveryId);
      
      if (!delivery) {
        throw new Error('Delivery not found');
      }

      delivery.status = status;
      delivery.updates.push({
        status,
        note,
        location: riderLocation,
        timestamp: new Date()
      });

      // Update timeline
      const now = new Date();
      if (status === 'picked-up' && !delivery.timeline.actualPickup) {
        delivery.timeline.actualPickup = now;
      } else if (status === 'delivered' && !delivery.timeline.actualDelivery) {
        delivery.timeline.actualDelivery = now;
        
        // Mark rider as available
        if (delivery.rider) {
          await Rider.findByIdAndUpdate(delivery.rider, {
            status: 'available',
            $unset: { currentDelivery: 1 },
            $inc: { 'stats.completedDeliveries': 1 }
          });
        }
      }

      await delivery.save();

      // Notify business and customer
      await notificationService.sendDeliveryStatusUpdate(delivery, status);

      return delivery;
    } catch (error) {
      throw new Error(`Error updating delivery status: ${error.message}`);
    }
  }
};

