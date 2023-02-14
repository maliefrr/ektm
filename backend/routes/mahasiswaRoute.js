const { addMahasiswa, getAllMahasiswa, getMahasiswaDetail, editMahasiswa } = require("../controller/mahasiswaController")
const protect = require("../middleware/authHandler")
const router = require("express").Router()

router.get("/all",protect,getAllMahasiswa)
router.post("/add",addMahasiswa)
router.get("/profile/:username", getMahasiswaDetail)
router.put("/edit/:username",editMahasiswa)
module.exports = router