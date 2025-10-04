const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/:orderNumber", getOrderById);
router.put("/:orderNumber/status", updateOrderStatus);
router.delete("/:orderNumber", deleteOrder);

module.exports = router;