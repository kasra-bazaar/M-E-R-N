const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const policy = require("cors");
const fs = require("fs");
const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");
const path = require("path");

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

const corsOptions = {
  origin: true,
  credentials: true,
};
app.options("*", policy(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With , Content-Type , Accept , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET , POST , PATCH , DELETE , PUT"
  );
  next();
  
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use((req, res) => {
  return res.status(404).json({ message: "COULD NOT FOUND THIS ROUTE" });
});
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  if (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "WE HAVE SOME ERROR AT THIS POINT " });
  }
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@personaweb.rescybx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Personaweb`
  )
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
