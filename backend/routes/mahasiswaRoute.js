const { addMahasiswa, getAllMahasiswa, getMahasiswaDetail, editMahasiswa, deleteMahasiswa } = require("../controller/mahasiswaController")
const protect = require("../middleware/authHandler")
const router = require("express").Router()

router.get("/all",protect,getAllMahasiswa)
router.post("/add",addMahasiswa)
router.get("/profile/:username", getMahasiswaDetail)
router.put("/edit/:username",editMahasiswa)
router.delete("/delete/:nim", protect, deleteMahasiswa)

module.exports = router