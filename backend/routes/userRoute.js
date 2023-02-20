const { getAllUser, register, login, deleteUser, editProfileUser } = require("../controller/userController")
const router = require("express").Router()
const protect = require("../middleware/authHandler.js")


router.get("/all",protect,getAllUser)
router.post("/login",login)
router.post("/register", register)
router.delete("/delete/:id",protect,deleteUser)
router.put("/edit/:username",editProfileUser)


module.exports = router