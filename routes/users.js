const express = require("express");

const { check } = require("express-validator");

const { getUsers, loginUser, signupUser } = require("./../controllers/users");

const fileUpload = require('./../middleware/fileUpload')
const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signupUser
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  loginUser
);

module.exports = router;
