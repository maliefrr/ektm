const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const connectDB = require("./config/db.js")
const multer = require("multer")
const cors = require('cors');
const path = require('path')
const app = express()

connectDB()
const port = process.env.PORT || 5000;


// setting up multer
const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'images')
    },
    filename: (req,file,cb) => {
        cb(null,`${new Date().getTime()}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
    } else {
    cb(null, false);
    }
};

app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter,
    }).single('pas_foto')
);


// middleware
app.use(express.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:3000','https://64ce-182-1-202-230.ap.ngrok.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace with your React app's URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


// load route
app.use("/api/users/",require("./routes/userRoute.js"))
app.use("/api/mahasiswa/",require("./routes/mahasiswaRoute"))

// cek if the app is on production
if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static("frontend/build"))

    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

app.listen(port, console.log(`App is running on port ${port}`))