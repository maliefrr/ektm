const userModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { findOne } = require("../models/userModel.js")

const getAllUser = asyncHandler( async (req,res) => {
    const authorizeUser = req.user.id;
    const user = await userModel.findById(authorizeUser)
    const data = await userModel.find()
    if(authorizeUser && user.role === "admin") {
        res.status(200).json({
            statusCode: 200,
            message: "Succes",
            data: data.map(user => {
                return {
                    username : user.username,
                    email: user.email,
                    role: user.role,
                    id: user.id
                }
            })
        })
    }
    res.status(401).json({
        statusCode: 401,
        message: "User not authorized"
    })
})

const register = asyncHandler( async (req,res) => {
    const {name,username,email,password} = req.body;

    if(!name || !username || !email || !password) {
        res.status(400).json({
            statusCode: 400,
            message: "The field cannot be blank"
        })
    } else {
        const user = await userModel.findOne({username});
        if(user){
            res.status(400).json({
                statusCode:400,
                message: "Username has been already exist"
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt)
            const data = await userModel.create({
                username,email,password : hash
                ,name,role : "admin"
            })
            data.save()
            res.status(201).json({
                statusCode: 201,
                message: "User has been successfully registered",
                data: {
                    id: data.id,
                    token: getToken(data.id)
                }
            })
        }
    }
})

const editProfileUser = asyncHandler(async (req,res) => {
    try {
        const {email} = req.body
        const data = await userModel.findOneAndUpdate({username : req.params.username},{
            email
        })
        res.status(200).json({
            statusCode: 200,
            message: "The data has been successfully updated",
            data: {
                email: data.email
            }
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
})

const editPassword = asyncHandler(async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password,salt)
        await userModel.findOneAndUpdate({username: req.params.username},{
            password
        })
        res.status(200).json({
            statusCode: 200,
            message: "Password has been successfully updated"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

const getUser = asyncHandler(async (req,res) => {
    try {
        const username = req.params.username;
        const data = await userModel.findOne({username: username})
        res.status(200).json({
            statusCode: 200,
            data: {
                username: data.username,
                name: data.name,
                email: data.email,
                role: data.role
            }
        })
    } catch (error) {
        
    }
})

const deleteUser = async (req,res) => {
    const data = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        data: {
            user: data.username,
            id: data.id
        }
    })
}

const login = asyncHandler( async (req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({
            statusCode: 400,
            message: "The field cannot be blank"
        })
    }
    const user = await userModel.findOne({username})
    if(user && await bcrypt.compare(password,user.password)){
            res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: getToken(user.id)
                }
            })
    } else {
        res.status(400).json({
            statusCode: 400,
            message: "The user or password you input are invalid"
        })
        }
    }
)

const getToken = (id) => {
    return jwt.sign({id},process.env.SECRET,{
        expiresIn: "1d"
    })
}

module.exports = {
    getAllUser,register,login,deleteUser,editProfileUser,getUser,editPassword
}