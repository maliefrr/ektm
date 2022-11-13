const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db.js")
const app = express()

connectDB()
const port = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// load route
app.use("/api/users/",require("./routes/userRoute.js"))


app.listen(port, console.log(`App is running on port ${port}`))