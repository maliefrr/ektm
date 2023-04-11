const router = require("express").Router()
const {getAnnouncementAll, scrapeAnnouncement} = require("../controller/announcementController")


router.get("/all", getAnnouncementAll)
router.get("/get",scrapeAnnouncement)

module.exports = router