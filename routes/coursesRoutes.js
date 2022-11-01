const express = require("express");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursesControllers");
const validation = require("../middlewares/validationMiddleware");
const isPsychology = require("../middlewares/isPsychology");
const { coursesValidation } = require("../validations/coursesValidation");
const userRequireAuth = require("../middlewares/userRequireAuth");

// express router
const router = express();

router.post(
  "/",
  userRequireAuth,
  isPsychology,
  validation(coursesValidation),
  createCourse
);
router.get("/", userRequireAuth, isPsychology, getCourses);
router.get("/:id", userRequireAuth, getCourse);
router.put(
  "/:id",
  userRequireAuth,
  validation(coursesValidation),
  updateCourse
);
router.delete("/:id", userRequireAuth, isPsychology, deleteCourse);

module.exports = router;
