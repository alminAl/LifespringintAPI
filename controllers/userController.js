const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

// create token
const createToken = (_id) => {
    return jwt.sign({ _id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "3d"
    });
}

// signup controller
const signupUSer = async (req, res) => {

    // get info from body/user
    const { email,
        password,
        name,
        mobile_number,
        about,
        profile_image } = req.body;

    try {
        const user = await UserModel.signup(
            email,
            password,
            name,
            mobile_number,
            about,
            profile_image
        );

        const token = createToken(user._id);

        res.status(200).json({ name, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);

        res.status(200).json({ email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// export modules
module.exports = {
    signupUSer,
    loginUser
}