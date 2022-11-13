const userModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const getAllUser = (req,res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Succes"
    })
}

const register = async (req,res) => {
    const {name,username,email,password,role} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)

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
            const data = await userModel.create({
                username,email,password : hash
                ,name,role
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
}

const getToken = (id) => {
    return jwt.sign({id},process.env.SECRET,{
        expiresIn: "1d"
    })
}

module.exports = {
    getAllUser,register
}