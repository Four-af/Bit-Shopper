const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { makeSafe } = require("./helpers");

// register handler
const register = async (req, res) => {
  const newUser = new User({
    username: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
};

// login handler
const login = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ username: req.body.username });
  if (!user) throw new Error("Wrong credentials");

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  );
  const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (OriginalPassword !== req.body.password) {
    throw new Error("Wrong credentials");
  }

  const accessToken = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );
  const { password, ...others } = user._doc;
  return res.status(200).json({ ...others, accessToken });
};

// logout handler
const logout = async (req, res) => {};

// routers
router.post("/register", makeSafe(register));
router.post("/login", makeSafe(login));
router.post("/logout", makeSafe(logout));

module.exports = router;
