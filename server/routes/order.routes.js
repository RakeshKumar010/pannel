const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
} = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/:_id", getOrderById);
router.put("/:_id/status", updateOrderStatus);
router.delete("/:_id", deleteOrder);
router.get("/", getAllOrders);

module.exports = router;