const Order = require("../models/order.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const createOrder = async (req, res, next) => {
  try {
    const {
      fullName,
      mobile,
      cityState,
      pincode,
      fullAddress,
      productName,
      quantity,
      totalAmount,
      paymentMethod,
      cardNumber,
      expiryDate,
      securityCode,
    } = req.body;

    // Validate required fields
    if (!fullName || !mobile || !cityState || !pincode || !fullAddress || !productName || !quantity || !totalAmount || !paymentMethod) {
      return next(new ApiError("All required fields must be provided", 400));
    }

    // Validate payment details if paymentMethod is Credit Card or Debit Card
    if ((paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (!cardNumber || !expiryDate || !securityCode)) {
      return next(new ApiError("Card details are required for Credit/Debit Card payment", 400));
    }

    const order = new Order({
      orderNumber: `##*${Math.floor(Math.random() * 1000)}*`, // Simple random order number generation
      fullName,
      mobile,
      cityState,
      pincode,
      fullAddress,
      productName,
      quantity,
      totalAmount,
      paymentMethod,
      cardNumber,
      expiryDate,
      securityCode,
    });

    await order.save();
    console.log("Order created:", { orderNumber: order.orderNumber, fullName });

    return res
      .status(201)
      .json(new ApiResponse(201, "Order created successfully", order));
  } catch (err) {
    console.error("Error creating order:", err);
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return next(new ApiError("No orders found", 404));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully", orders));
  } catch (err) {
    console.error("Error fetching all orders:", err);
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    if (!orderNumber) {
      return next(new ApiError("Order number is required", 400));
    }

    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return next(new ApiError("Order not found", 404));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Order fetched successfully", order));
  } catch (err) {
    console.error("Error fetching order:", err);
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;

    if (!orderNumber) {
      return next(new ApiError("Order number is required", 400));
    }
    if (!status || !["Pending", "Completed", "Cancelled"].includes(status)) {
      return next(new ApiError("Valid status (Pending, Completed, Cancelled) is required", 400));
    }

    const order = await Order.findOneAndUpdate(
      { orderNumber },
      { $set: { status, updatedAt: Date.now() } },
      { new: true, runValidators: true }
    );

    if (!order) {
      return next(new ApiError("Order not found", 404));
    }

    console.log("Order status updated:", { orderNumber, status });
    return res
      .status(200)
      .json(new ApiResponse(200, "Order status updated successfully", order));
  } catch (err) {
    console.error("Error updating order status:", err);
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    if (!orderNumber) {
      return next(new ApiError("Order number is required", 400));
    }

    const order = await Order.findOneAndDelete({ orderNumber });

    if (!order) {
      return next(new ApiError("Order not found", 404));
    }

    console.log("Order deleted:", orderNumber);
    return res
      .status(200)
      .json(new ApiResponse(200, "Order deleted successfully", {}));
  } catch (err) {
    console.error("Error deleting order:", err);
    next(err);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};