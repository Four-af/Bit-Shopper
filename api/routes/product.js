const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { makeSafe } = require("./helpers");

const router = require("express").Router();

// CREATE
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  return res.status(200).json(savedProduct);
};

// UPDATE
const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  return res.status(200).json(updatedProduct);
};

// DELETE
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.status(200).json("Product has been deleted...");
};

// GET PRODUCT
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json(product);
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(1);
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else {
    products = await Product.find();
  }

  return res.status(200).json(products);
};

router.post("/", verifyTokenAndAdmin, makeSafe(createProduct));
router.put("/:id", verifyTokenAndAdmin, makeSafe(updateProduct));
router.delete("/:id", verifyTokenAndAdmin, makeSafe(deleteProduct));
router.get("/find/:id", makeSafe(getProduct));
router.get("/", makeSafe(getAllProducts));

module.exports = router;
