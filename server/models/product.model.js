const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // --- Product Core Details ---
  name: {
    type: String,
    required: true,
  },
  
  // --- Pricing Details ---
  price: { // Sale Price (e.g., 499)
    type: Number,
    required: true,
    default: 0,
  },
  mrp: { // Maximum Retail Price (e.g., 899)
    type: Number,
    required: true,
    default: 0,
  },
  discountPercent: { // Auto-calculated (e.g., 67)
    type: Number,
    default: 0,
  },

  // --- Inventory and Metrics ---
  stock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },

  // --- Admin/Lifecycle Fields (Matching Branch Schema) ---
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
