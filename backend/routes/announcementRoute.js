const router = require("express").Router()
const {getAnnouncementAll, addAnnouncement} = require("../controller/announcementController")


router.get("/all", getAnnouncementAll)
router.post("/add",addAnnouncement)

module.exports = router