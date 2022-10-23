require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const courseRoutes = require("./routes/coursesRoutes");

// express app
const app = express();


// middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));



// route
app.get("/", (req, res) => {
  res.status(200).json({ api: "Life Spring API 🌳" });
});

// routes for user
app.use("/api/auth", userRoutes);
app.use("/api/user/profile", userProfileRoutes);
app.use("/api/courses", courseRoutes);



// connect to DB
mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => {
    // listen for request
    app.listen(4000, () => {
      console.log("I on listen for port 4000 😎");
    });
  })
  .catch((error) => {
    console.log(error);
  });
