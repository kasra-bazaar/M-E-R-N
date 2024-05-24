const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getPlacesByUserId,
  getPlacesById,
  createPlace,
  deletePlace,
  updatePlace,
} = require("./../controllers/places");
const fileUpload = require("../middleware/fileUpload");

const checkAuth = require("../middleware/checkAuth");

router.get("/:pid", getPlacesById);

router.get("/user/:uid", getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  check("address").not().isEmpty(),
  createPlace
);

router.put(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:pid", deletePlace);
module.exports = router;
