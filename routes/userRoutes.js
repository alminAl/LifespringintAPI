const express = require('express');
const { signupUSer, loginUser, allUser, updateUser } = require('../controllers/userController');
// const userRequireAuth = require('../middlewares/userRequireAuth');
const validation = require('../middlewares/validationMiddleware');
const { userSignupValidation, userLoginValidation } = require('../validations/userValidation');


// express router
const router = express();


// signup user 
router.post("/auth/signup", validation(userSignupValidation), signupUSer);

// login user 
router.post("/auth/login", validation(userLoginValidation), loginUser);

// // get All user
router.get('/users', allUser);

// update user
router.patch("/user/profile/:id", validation(userLoginValidation), updateUser)


// export modules
module.exports = router;