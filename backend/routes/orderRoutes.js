const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../App/controllers/orderController");
const authMiddleware = require("../App/middleware/authMiddleware");

// Place a new order
router.post("/", authMiddleware, placeOrder);

// Get orders for the authenticated user
router.get("/", authMiddleware, getOrders);

module.exports = router;
