const { validationResult } = require("express-validator");
const User = require("./../models/userSchema");
const mongoose = require("mongoose");
const Place = require("./../models/placeSchema");
const fs = require("fs");

const getPlacesById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "COULD NOT CONNECT TO THE DATABASE" });
  }

  if (!place) {
    return res.status(404).json({ message: "WE DONT HAVE THIS PLACE" });
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userPlace;
  try {
    userPlace = await Place.find({ creator: userId });
  } catch (err) {
    return res.status(500).json({ message: "CANNOT CONNECT TO THE DATABASE" });
  }

  if (!userPlace || userPlace.length === 0) {
    return res.status(404).json({ message: "USER DOESNT HAVE PLCAE !" });
  }
  res.json({
    userPlaces: userPlace.map((userPlaces) =>
      userPlaces.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const { title, description, coordinators, address, creator, image } =
    req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: "YOUR INPUT VALUE IS INCORRECT" });
  }
  const createdPlace = new Place({
    title,
    description,
    image: req.file.path,
    location: { lat: 400000, lng: 400000 },
    address,
    creator,
  });
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    res.status(500).json({ message: "COULD NOT CONNECT TO THE DATABASE" });
  }
  if (!user) {
    return res.status(404).json({ message: "DONT HAVE USER " });
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save();
    await sess.commitTransaction();
  } catch (err) {
    return res
      .status(500)
      .json({ message: " CREATING PLACE FAILED . PLEASE TRY AGAIN" });
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: "YOUR INPUT VALUE IS INCORRECT" });
  }
  const placeId = req.params.pid;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    res.status(500).json({ message: "CANNOT CONNECT TO THE DATABASE" });
  }
  if (updatedPlace.creator.toString() !== req.userData.userId) {
    return res
      .status(401)
      .json({ message: "YOU ARE NOT ALLOWED TO DO THIS ACTION" });
  }
  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "HAVE A PROBLEM WITH CONNECTING TO THE DATABASE" });
  }

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = async (req, res) => {
  const placeId = req.params.pid;
  let deletedPlace;
  try {
    deletedPlace = await Place.findById(placeId).populate("creator");
    
  } catch (err) {
    return res
      .status(500)
      .json({ message: "COULD NOT CONNECT TO THE DATABASE" });
  }
  if (!deletedPlace) {
    res.status(404).json({ message: "THIS PLACE DOES NOT EXIST!" });
  }

  if (deletedPlace.creator.id !== req.userData.userId) {
    return res
      .status(401)
      .json({ message: "YOU ARE NOT ALLOWED TO DO THIS ACTION" });
  }
  const imagePath = deletedPlace.image;

  try {
   
    const sess = await mongoose.startSession();
    sess.startTransaction();
    // await deletedPlace.remove({ session: sess });
    // deletedPlace.creator.places.pull(deletedPlace);
    await Place.deleteOne({ _id: placeId }).session(sess);
    deletedPlace.creator.places.pull({ _id: placeId });
    await deletedPlace.creator.save({ session: sess });
    (await sess).commitTransaction();


    fs.unlink(imagePath, (err) => {
      console.log(imagePath);
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "COULD NOT CONNECT TO THE DATABASE" + err });
  }
  res.status(200).json({ message: "PLACE SUCCESFULLY DELETED !" });
};
exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
