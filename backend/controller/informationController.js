const asyncHandler = require("express-async-handler")
const {informationModel} = require("../models/informationModel.js")


const addInformation = asyncHandler(async (req, res) => {
    const { title, content, source } = req.body;
    let pictureUrl = null;
    if (req.file) {
      const filePath = req.file.path;
      const imageUpload = await uploader(process.env.IMG_API, filePath);
      pictureUrl = imageUpload.image.url;
    }
      if (!title || !content) {
        res.status(400).json({
          statusCode: 400,
          message: "The Field cannot be blank",
        });
      }
        const data = await informationModel.create({
          title,
          content,
          source,
          picture: pictureUrl,
        });
        res.status(200).json({
          statusCode: 200,
          data,
        });
  });
  

const getInformationAll = asyncHandler(async (req,res) => {
    try {
        const data = await informationModel.find()
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
    addInformation,getInformationAll
}