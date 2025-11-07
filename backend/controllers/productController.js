import Product from '../models/Product.js';
import Business from '../models/Business.js';

// @desc    Get all products for a business
// @route   GET /api/products/business/:businessId
// @access  Public
export const getBusinessProducts = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { category, status = 'active' } = req.query;

    const query = { business: businessId, status };
    if (category) query.category = category;

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id });
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    const product = await Product.create({
      business: business._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:productId
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findById(productId).populate('business');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Verify business ownership
    if (product.business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:productId
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findById(productId).populate('business');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Verify business ownership
    if (product.business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:productId
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findById(productId).populate('business', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

