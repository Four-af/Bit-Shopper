const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { makeSafe } = require("./helpers");

const router = require("express").Router();

// CREATE
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  const savedOrder = await newOrder.save();
  return res.status(200).json(savedOrder);
};

// UPDATE
const updateOrder = async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedOrder);
};

// DELETE
const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  return res.status(200).json("Order has been deleted...");
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  return res.status(200).json(orders);
};

// GET ALL
const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json(orders);
};

// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && { products: { $elemMatch: { productId } } }),
      },
    },
    { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
    { $group: { _id: "$month", total: { $sum: "$sales" } } },
  ]);
  return res.status(200).json(income);
};

router.post("/", verifyToken, makeSafe(createOrder));
router.put("/:id", verifyTokenAndAdmin, makeSafe(updateOrder));
router.delete("/:id", verifyTokenAndAdmin, makeSafe(deleteOrder));
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  makeSafe(getUserOrders)
);
router.get("/", verifyTokenAndAdmin, makeSafe(getAllOrders));
router.get("/income", verifyTokenAndAdmin, makeSafe(getMonthlyIncome));

module.exports = router;
