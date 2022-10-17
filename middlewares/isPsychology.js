require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const isPsychology = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: "Unauthorized User" });
  }

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = await UserModel.findById({ _id });

      if (!req.user.isPsychiatrist) {
        res.status(401).send({ message: "User is not Psychiatrist" });
      } else {
        next();
      }
      // next();
    } catch (error) {
      res.status(401).send({ message: "Unauthorized User" });
    }
  }
};

module.exports = isPsychology;
