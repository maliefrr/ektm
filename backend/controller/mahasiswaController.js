const asyncHandler = require("express-async-handler");
const { mahasiswaModel } = require("../models/mahasiswaModel");
const bcrypt = require("bcryptjs");
const uploader = require("imgbb-uploader")
const userModel = require("../models/userModel");

const addMahasiswa = asyncHandler( async (req,res) => {
    const {name,prodi,nim,alamat,gol_darah,jenis_kelamin} = req.body;

    const role = req.user.id;
    const salt = await bcrypt.genSalt(10);
    const authorizeUser = await userModel.findById(role)
    const filePath = req.file.path;
    
    if(!name || !prodi || !nim || !alamat) {
        res.status(400).json({
            statusCode: 400,
            message: "The field cannot be blank"
        })
    }
    if(authorizeUser.role !== "admin") {
        res.status(401).json({
            statusCode: 401,
            message: "User not authorized"
        })
    } else {
        const imageUpload = await uploader(process.env.IMG_API, filePath)
        const data = await mahasiswaModel.create({
            name,prodi,alamat,pas_foto : imageUpload.image.url, nim,
            gol_darah : gol_darah ? gol_darah : "-",
            jenis_kelamin: jenis_kelamin ? jenis_kelamin : "-"
        })
        data.save()
        const createdUser = await userModel.create({
            username: data.nim,
            email: `${nim}@uho.ac.id`,
            password: await bcrypt.hash(nim,salt),
            role: "mahasiswa",
            name
        })
        createdUser.save()
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data
        })
    }
})


module.exports = {
    addMahasiswa
}