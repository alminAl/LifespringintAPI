const yup = require("yup");

// course validation
const coursesValidation = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  duration: yup.number().required(),
  course_type: yup.string().required(),
  videos: yup.string().required(),
  cover_photo: yup.string(),
});

module.exports = {
  coursesValidation,
};
