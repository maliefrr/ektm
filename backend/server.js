const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const connectDB = require("./config/db.js")
const multer = require("multer")
const cors = require('cors');
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
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// load route
app.use("/api/users/",require("./routes/userRoute.js"))
app.use("/api/mahasiswa/",require("./routes/mahasiswaRoute"))


app.listen(port, console.log(`App is running on port ${port}`))