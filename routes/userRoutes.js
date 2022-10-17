const express = require("express");
const {
  signupUSer,
  loginUser,
  allUser,
  updateUser,
  changePassword,
} = require("../controllers/userController");
const userRequireAuth = require("../middlewares/userRequireAuth");
const validation = require("../middlewares/validationMiddleware");
const {
  userSignupValidation,
  userLoginValidation,
  userUpdateValidation,
  passwordValidation,
} = require("../validations/userValidation");

// express router
const router = express();

// signup user
router.post("/signup", validation(userSignupValidation), signupUSer);

// login user
router.post("/login", validation(userLoginValidation), loginUser);

// // get All user
router.get("/users", allUser);

// update user
router.patch(
  "/user/profile/:id",
  userRequireAuth,
  validation(userUpdateValidation),
  updateUser
);

// change password
router.post(
  "/user/change_password/:id",
  userRequireAuth,
  validation(passwordValidation),
  changePassword
);

// export modules
module.exports = router;
