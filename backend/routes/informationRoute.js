const router = require("express").Router()
const {getInformationAll, addInformation, scrapInformation} = require("../controller/informationController")

router.get("/all",getInformationAll)
router.get("/get",scrapInformation)

module.exports = router