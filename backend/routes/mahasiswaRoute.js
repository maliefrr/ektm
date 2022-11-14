const { addMahasiswa } = require("../controller/mahasiswaController")
const protect = require("../middleware/authHandler")
const router = require("express").Router()

router.post("/add", protect ,addMahasiswa)

module.exports = router