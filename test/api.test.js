const axios = require("axios");
const jwt = require("jsonwebtoken")
const {userModel} = require("../backend/models/userModel")


test("Register user function that user did not fill username field",async () => {
    const response = await axios.post("http://localhost:5000/api/users/register",{
        name: "Muhammad Firmansyah",
        email: "Firman1212@gmail.com",
        password: "firman123"
    })
    console.log(response)
    expect(response.status).toBe(400)
})

test("Register user function that user did not fill name field",async () => {
    const response = await axios.post("http://localhost:5000/api/users/register",{
        username: "firman1212",
        email: "Firman1212@gmail.com",
        password: "firman123"
    })

    expect(response.status).toBe(400)
})

test("Register user function that user did not fill email field",async () => {
    const response = await axios.post("http://localhost:5000/api/users/register",{
        name: "Muhammad Firmansyah",
        username: "Firman1212",
        password: "firman123"
    })

    expect(response.status).toBe(400)
})

test("Register user function that user did not fill password field",async () => {
    const response = await axios.post("http://localhost:5000/api/users/register",{
        name: "Muhammad Firmansyah",
        email: "Firman1212@gmail.com",
        username: "firman1212"
    })

    expect(response.status).toBe(400)
})

    // test("Register user function should return an object",async () => {
    //     const response = await axios.post('http://localhost:5000/api/users/register',{
    //         name : "Muhamad Firmansyah",
    //         username : "Firman1212",
    //         email: "Firman1212@gmail.com",
    //         password: "firman123"
    //     })
    //     // console.log(response.data.data)
    //     // console.log(response.status)
    //     expect(response.status).toBe(201);
    //     expect(response.data.data).toHaveProperty('id');
    //     expect(response.data.data).toHaveProperty('token');
    //     userModel.findByIdAndDelete(response.data.data.id);
    // })