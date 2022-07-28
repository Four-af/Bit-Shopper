const Cart = require("../models/Cart");
const { makeSafe } = require("./helpers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  const savedCart = await newCart.save();
  return res.status(200).json(savedCart);
};

// UPDATE
const updateCart = async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  return res.status(200).json(updatedCart);
};

// DELETE
const deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  return res.status(200).json("Cart has been deleted...");
};

// GET USER CART
const getUserCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  return res.status(200).json(cart);
};

// GET ALL
const getAll = async (req, res) => {
  const carts = await Cart.find();
  return res.status(200).json(carts);
};

router.post("/", verifyToken, makeSafe(createCart));
router.put("/:id", verifyTokenAndAuthorization, makeSafe(updateCart));
router.delete("/:id", verifyTokenAndAuthorization, makeSafe(deleteCart));
router.get("/find/:userId", verifyTokenAndAuthorization, makeSafe(getUserCart));
router.get("/", verifyTokenAndAdmin, makeSafe(getAll));

module.exports = router;
