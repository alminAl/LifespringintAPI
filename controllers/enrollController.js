const EnrollModel = require("../models/enrollModel");


// crate enroll
const createEnroll = async (req, res) => {
    const { course_id, date, feedback } = req.body;

    try {
        const user = req.user;

        const enrollCourse = await EnrollModel.create({
            user_id: user,
            course_id,
            date,
            feedback
        })
        res.status(200).json({
            enrollCourse
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// all enroll courses
const getEnrollCourses = async (req, res) => {
    try {
        const enrollCourses = await EnrollModel.find({});
        res.status(200).json({
            enrollCourses
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get a enroll course
const getEnrollCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollCourse = await EnrollModel.findById({ _id: id });

        if (!enrollCourse) {
            return res.status(400).json({ error: "Not such a Enroll Course." });
        } else {
            res.status(200).json({
                enrollCourse
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update enroll course
const updateEnrollCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollCourse = await EnrollModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    course_id: req.body?.course_id,
                    date: req.body?.date,
                    feedback: req.body?.feedback,
                },
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );
        if (!enrollCourse) {
            return res.status(400).json({ error: "Not such a Course." });
        } else {
            res.status(200).json({
                enrollCourse
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a enroll course
const deleteEnrollCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollCourse = await EnrollModel.findOneAndDelete({ _id: id });
        if (!enrollCourse) {
            return res.status(400).json({ error: "Not such a Enroll Course." });
        } else {
            res.status(200).json({
                enrollCourse
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = {
    createEnroll,
    getEnrollCourses,
    getEnrollCourse,
    updateEnrollCourse,
    deleteEnrollCourse
};