const mongoose = require("mongoose")

const announcementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    source: {
        type: String
    }
},{
    timestamps: true
})

const announcementModel = mongoose.model("Announcement",announcementSchema)

module.exports = {announcementModel}