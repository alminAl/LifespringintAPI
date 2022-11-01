require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const isPsychology = async (req, res, next) => {

  console.log(req.user.isPsychiatrist)

  if (!req.user.isPsychiatrist) {
    res.status(401).send({ message: "User is not Psychiatrist" });
  } else {
    next();
  }
};

module.exports = isPsychology;
