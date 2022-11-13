const { getAllUser } = require("../controller/userController")
const router = require("express").Router()


router.get("/",getAllUser)

module.exports = router