const axios = require("axios");
const userModel = require("../backend/models/userModel")


test("Register user function that user did not fill username field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            name: "Muhammad Firmansyah",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })
    } catch (error) {
        // console.error(error.response.data.message)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function that user did not fill name field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            username: "firman1212",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })
    } catch (error) {
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function that user did not fill email field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            name: "Muhammad Firmansyah",
            username: "Firman1212",
            password: "firman123"
        })
    } catch (error) {
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function that user did not fill password field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            name: "Muhammad Firmansyah",
            email: "Firman1212@gmail.com",
            username: "firman1212"
        })
    } catch (error) {
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function should return an object",async () => {
        const response = await axios.post('http://localhost:5000/api/users/register',{
            name : "Muhamad Firmansyah",
            username : "Firman1212",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })
        // console.log(response.data.data)
        // console.log(response.status)
        expect(response.status).toBe(201);
        expect(response.data.data).toHaveProperty("id");
        expect(response.data.data).toHaveProperty("token")
    })

test("Register user function return an error because user enter the user that already exist",async () => {
    try {
        await axios.post('http://localhost:5000/api/users/register',{
            name : "Muhamad Firmansyah",
            username : "Firman1212",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })
    } catch (error) {
        expect(error.response.data.message).toBe("Username has been already exist")
    }
})