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

// secure password method
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
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


        res.status(200).json({ name, email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);

        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get all user
const allUser = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json({ users, message: "These are all users" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// update user info
const updateUser = async (req, res) => {

    const { id } = req.params;
    try {
        const user = await UserModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {

                    email: req.body?.email,
                    name: req.body?.name,
                    mobile_number: req.body?.mobile_number,
                    about: req.body?.about,
                    profile_image: req.body?.profile_image,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// change password
const changePassword = async (req, res) => {
    try {

        const { id } = req.params;
        const password = req.body.password;

        const newPassword = await securePassword(password);

        const user = await UserModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    password: newPassword

                },
            },
            {
                new: true,
                upsert: true,
            }
        );
        res.status(200).json({ user, message: "Password change successfully" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// export modules
module.exports = {
    signupUSer,
    loginUser,
    allUser,
    updateUser,
    changePassword
}