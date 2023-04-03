const userModel = require("../models/userModel.js")
const asyncHandler = require("express-async-handler")
const announcementModel = require("../models/announcementModel.js")


const addAnnouncement = asyncHandler(async (req,res) => {
    const {title,content,source} = req.body;
    const filePath = req.file.path
    const imageUpload = await uploader(process.env.IMG_API, filePath)
    const authorizeUser = req.user.id
    try {
        if(!title || !content){
            res.status(400).json({
                statusCode: 400,
                message: "The Field cannot be blank"
            })
        }
        if(authorizeUser && await userModel.findById(authorizeUser).role === "admin"){
            const data = await announcementModel.create({
                title,content,source, picture : imageUpload.image.url 
            })
            data.save()
            res.status(200).json({
                statusCode: 200,
                data
            })
        } else {
            res.status(401).json({
                statusCode: 401,
                message: "User is not Authorized"
            })
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error
        })
    }
})

const getAnnouncementAll = asyncHandler(async (req,res) => {
    try {
        const data = await announcementModel.find()
        res.status(200).json({
            statusCode: 200,
            data
        })
                
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error
        })
    }
})

module.exports = {
    addAnnouncement,getAnnouncementAll
}