const express = require("express");
const { createEnroll, getEnrollCourses, getEnrollCourse, updateEnrollCourse, deleteEnrollCourse } = require("../controllers/enrollController");
const userRequireAuth = require("../middlewares/userRequireAuth");

// express router
const router = express();

router.post("/", userRequireAuth, createEnroll);

router.get("/", userRequireAuth, getEnrollCourses);

router.get("/:id", userRequireAuth, getEnrollCourse);

router.put("/:id", userRequireAuth, updateEnrollCourse);

router.delete("/:id", userRequireAuth, deleteEnrollCourse);

module.exports = router;