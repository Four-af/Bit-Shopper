const User = require("../models/User");
const { makeSafe } = require("./helpers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// UPDATE
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  return res.status(200).json(updatedUser);
};

// DELETE
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json("User has been deleted...");
};

// GET USER
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, ...others } = user._doc;
  return res.status(200).json(others);
};

// GET ALL USER
const getAllUser = async (req, res) => {
  const query = req.query.new;
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  return res.status(200).json(users);
};

// GET USER STATS
const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    { $project: { month: { $month: "$createdAt" } } },
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);
  return res.status(200).json(data);
};

router.put("/:id", verifyTokenAndAuthorization, makeSafe(updateUser));
router.delete("/:id", verifyTokenAndAuthorization, makeSafe(deleteUser));
router.get("/find/:id", verifyTokenAndAdmin, makeSafe(getUser));
router.get("/", verifyTokenAndAdmin, makeSafe(getAllUser));
router.get("/stats", verifyTokenAndAdmin, makeSafe(getStats));

module.exports = router;
