const { getAllUser, register } = require("../controller/userController")
const router = require("express").Router()


router.get("/",getAllUser)
router.post("/register", register)

module.exports = router