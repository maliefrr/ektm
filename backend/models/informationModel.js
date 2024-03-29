const mongoose = require("mongoose")

const informationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
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

const informationModel = mongoose.model("Information",informationSchema)

module.exports = {informationModel}