const asyncHandler = require("express-async-handler");
const { mahasiswaModel } = require("../models/mahasiswaModel");
const bcrypt = require("bcryptjs");
const uploader = require("imgbb-uploader")
const userModel = require("../models/userModel");


const getAllMahasiswa = asyncHandler(async (req,res) => {
    const authorizeUser = req.user.id;
    const user = await userModel.findById(authorizeUser)
    if(authorizeUser && user.role !== "admin") {
        res.status(401).json({
            statusCode: 401,
            message: "User not authorized"
        })
    } else {
        const data = await mahasiswaModel.find()
        res.status(200).json({
            statusCode: 200,
            data : data.map(user => {
                return {
                    id: user.id,
                    name : user.name,
                    nim : user.nim,
                    prodi : user.prodi,
                    alamat : user.alamat,
                    gol_darah : user.gol_darah,
                    pas_foto : user.pas_foto,
                    jenis_kelamin : user.jenis_kelamin,
                    status: user.status,
                    angkatan: user.angkatan
                }
            })
        })
    }
})

const addMahasiswa = asyncHandler( async (req,res) => {
    const {name,prodi,nim,alamat,gol_darah,jenis_kelamin,status,angkatan} = req.body;
    if(!name || !prodi || !nim || !alamat || !status || !angkatan ) {
        res.status(400).json({
            statusCode: 400,
            message: "The field cannot be blank"
        })
    }
    else {
        const salt = await bcrypt.genSalt(10);
        if(!req.file || !req.file.path){
            const data = await mahasiswaModel.create({
                name,prodi,alamat,pas_foto : "https://i.ibb.co/nrpmPBn/d4b6e87392d6.png" , nim,
                gol_darah : gol_darah ? gol_darah : "-",
                jenis_kelamin: jenis_kelamin ? jenis_kelamin : "-",
                status,angkatan
            })
            data.save()
            const createdUser = await userModel.create({
                username: data.nim,
                email: `${nim}@uho.ac.id`,
                password: await bcrypt.hash(data.nim,salt),
                role: "mahasiswa",
                name
            })
            createdUser.save()
            res.status(200).json({
                statusCode: 200,
                message: "Success",
                data
            })
        } else {
            const filePath = req.file.path
            const imageUpload = await uploader(process.env.IMG_API, filePath)
            const data = await mahasiswaModel.create({
                name,prodi,alamat,pas_foto : imageUpload.image.url , nim,
                gol_darah : gol_darah ? gol_darah : "-",
                jenis_kelamin: jenis_kelamin ? jenis_kelamin : "-",
                status,angkatan
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
                data,
            })
        }
    }
})

const getMahasiswaDetail = asyncHandler(async (req,res) => {
    try {
        const mahasiswa = await mahasiswaModel.findOne({nim: req.params.username});
        if(!mahasiswa){
            return res.status(404).json({
                statusCode: 404,
                message: "Mahasiswa not found"
            })
        } else {
            return res.status(200).json({
                statusCode: 200,
                mahasiswa
            })
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
})

const editMahasiswa = asyncHandler(async (req, res) => {
    try {
      const { name, prodi, nim, gol_darah, jenis_kelamin, alamat, status, angkatan } = req.body;
      const user = await mahasiswaModel.findOneAndUpdate(
        { nim: req.params.username },
        {
          name,
          prodi,
          nim,
          gol_darah,
          jenis_kelamin,
          alamat,
          status,
          angkatan,
        },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          message: "Mahasiswa Not Found",
        });
      }
  
      res.status(200).json({
        statusCode: 200,
        message: "The data has been successfully updated",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  });
  

  const deleteMahasiswa = async (req,res) => {
    const data = await mahasiswaModel.findOneAndDelete({nim : req.params.nim})
    const user = await userModel.findOneAndDelete({username : req.params.nim})
    if (!data) {
        res.status(404).json({
            statusCode : 404,
            message: "Mahasiswa not found"
        })
    } else {
        res.status(200).json({
            statusCode : 200,
            message: "Mahasiswa has been successfully deleted",
            data: {
                nama: data.name,
                nim: data.nim
            }
        })
    }
}


module.exports = {
    addMahasiswa, getAllMahasiswa, getMahasiswaDetail,editMahasiswa, deleteMahasiswa
}