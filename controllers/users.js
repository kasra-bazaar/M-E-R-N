
const { validationResult } = require("express-validator");
const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: "YOUR INPUT VALUE IS INCORRECT" });
  }

  let findUser;
  try {
    findUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: "CANNOT CONNECT TO THE DATABASE" });
  }

  if (!findUser) {
    return res
      .status(404)
      .json({ message: "WE DONT HAVE A USER WITH THIS EMAIL !" });
  }
  let equalPassword = false;
  try {
    equalPassword = await bcryptjs.compare(password, findUser.password);
  } catch (err) {
    return res.status(500).json({ message: "CANNOT COMPARE PASSWORDS" });
  }

  if (!equalPassword) {
    res.status(401).json({ message: "YOUR PASSWORD IS INCORRECT" });
  }
  let token;
  try {
    token = await jwt.sign(
      { userId: findUser.id, email: findUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.status(500).json({ message: "COULD NOT CREATE TOKEN" });
  }
  res
    .status(201)
    .json({ userId: findUser.id, email: findUser.email, token: token });
};

const signupUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: "YOUR INPUT VALUE IS INCORRECT" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: "CANNOT CONNECT TO THE DATABASE!" });
  }
  if (existingUser) {
    return res.status(422).json({ message: "USER ALREADY EXIST" });
  }
  let hashedPassword;
  try {
    hashedPassword = await bcryptjs.hash(password, 12);
  } catch (err) {
    return res.status(500).json({ message: "CANNOT HASH PASSWORD" });
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "CANNOT CONNECT TO THE DATABASE!! " });
  }
  let token;
  try {
    token = await jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.status(500).json({ message: "COULD NOT CREATE TOKEN" });
  }
  res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return res.status(500).json({ message: "CANNOT CONNECT TO THE DATABASE " });
  }
  if (!users) {
    return res.status(404).json({ message: " WE DONT HAVE ANY USERS" });
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.loginUser = loginUser;
exports.signupUser = signupUser;
exports.getUsers = getUsers;
