const jwt = require('jsonwebtoken');
require("dotenv").config();

const userRequireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ message: 'Unthorization access' })
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await UserModel.findOne({ _id }).select("_id");

        next();
    } catch (error) {

        return res.status(403).send({ message: 'Forbidden Access' })
    }

    try {
        const token = authorization.split(" ")[1];
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await UserModel.findById(_id).select("_id");
        next();
    } catch (error) {
        res.status(401).send({ message: "Forbidden Access" });
    }

};


module.exports = userRequireAuth;
