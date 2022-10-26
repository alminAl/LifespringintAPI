const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollSchema = new Schema({
    user_id: {
        type: String
    },
    course_id: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    },
    feedback: {
        type: String
    }
})

module.exports = mongoose.model("Enroll", enrollSchema);