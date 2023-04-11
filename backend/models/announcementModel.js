const mongoose = require("mongoose")

const announcementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    schedule: {
        type: Date,
    },
    source: {
        type: String
    }
},{
    timestamps: true
})

const announcementModel = mongoose.model("Announcement",announcementSchema)

module.exports = {announcementModel}