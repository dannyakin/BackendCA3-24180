const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const user = req.user;
    const newOrder = new Order({
      products,
      userId: user._id,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
};

const getOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ userId: userId })
      .populate({
        path: "products",
        select: "title price description price thumbnail category brand",
        match: { _id: { $type: "objectId" } },
      })
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
};

module.exports = { placeOrder, getOrders };
