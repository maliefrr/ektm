const router = require("express").Router()
const {getInformationAll, addInformation} = require("../controller/informationController")

router.get("/all",getInformationAll)
router.post("/add",addInformation)

module.exports = router