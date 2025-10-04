const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // Customer Details
  orderNumber: {
    type: String,
    required: [true, "Order number is required"],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\+?[1-9]\d{9,14}$/, "Please provide a valid mobile number"],
  },
  cityState: {
    type: String,
    required: [true, "City/State is required"],
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    match: [/^\d{6}$/, "Please provide a valid 6-digit pincode"],
  },
  fullAddress: {
    type: String,
    required: [true, "Full address is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },

  // Order Summary
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required"],
    min: [0, "Total amount cannot be negative"],
  },

  // Payment Info
  paymentMethod: {
    type: String,
    required: [true, "Payment method is required"],
    enum: ["Credit Card", "Debit Card", "UPI", "Cash on Delivery"],
    default: "Credit Card",
  },
  cardNumber: {
    type: String,
    required: function () {
      return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
    },
    match: [/^\d{12,19}$/, "Please provide a valid card number (12-19 digits)"],
  },
  expiryDate: {
    type: String,
    required: function () {
      return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
    },
    match: [/^(0[1-9]|1[0-2])\/\d{2}$/, "Please provide a valid expiry date (MM/YY)"],
  },
  securityCode: {
    type: String,
    required: function () {
      return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card";
    },
    match: [/^\d{3,4}$/, "Please provide a valid 3-4 digit security code"],
  },

  // Common Fields
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);