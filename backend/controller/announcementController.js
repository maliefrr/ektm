const asyncHandler = require("express-async-handler")
const puppeteer = require("puppeteer")
const  cron  = require('node-cron');
const {announcementModel} = require("../models/announcementModel.js")


const scrapeAnnouncement = asyncHandler(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://ilkom.fmipa.uho.ac.id/pengumuman/');
  
    const data = await page.$$eval('.gdlr-core-item-list', elements => {
      const dataArray = [];
      for (let element of elements) {
        const titleElement = element.querySelector('.gdlr-core-blog-title');
        const sourceElement = element.querySelector('.gdlr-core-blog-title a');
        const scheduleElement = element.querySelector('.gdlr-core-blog-info a');
        if (titleElement && scheduleElement && sourceElement) {
          const title = titleElement.textContent.trim();
          const schedule = scheduleElement.textContent.trim();
          const source = sourceElement.href;
          dataArray.push({ title, schedule, source });
        }
      }
      return dataArray
    });

    await browser.close()

    let newDataCount = 0;
    let newDataArr = []
    for (const newData of data) {
      const existingData = await announcementModel.findOne({ title: newData.title });
      const dateObject = new Date(newData.schedule)
      console.log(dateObject)
      console.log(newData)
      if (!isNaN(dateObject.getTime()) && !existingData) { // check if date is valid and data doesn't already exist
        await announcementModel.create({
          title: newData.title,
          source: newData.source,
          schedule: dateObject
        });
        newDataCount++;
        newDataArr.push(newData)
      } else {
        console.log(`Skipping announcement with invalid date: ${newData.title}`);
      }
    }    
    console.log(`Added ${newDataCount} new announcement.`)
  } catch (error) {
    console.log(error)
  }
}) 

const getAnnouncementAll = asyncHandler(async (req,res) => {
    try {
        const data = await announcementModel.find()
        res.status(200).json({
            statusCode: 200,
            data
        })
                
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error
        })
    }
})


cron.schedule('0 9 * * *',asyncHandler(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://ilkom.fmipa.uho.ac.id/pengumuman/');
  
    const data = await page.$$eval('.gdlr-core-item-list', elements => {
      const dataArray = [];
      for (let element of elements) {
        const titleElement = element.querySelector('.gdlr-core-blog-title');
        const sourceElement = element.querySelector('.gdlr-core-blog-title a');
        const scheduleElement = element.querySelector('.gdlr-core-blog-info a');
        if (titleElement && scheduleElement && sourceElement) {
          const title = titleElement.textContent.trim();
          const schedule = scheduleElement.textContent.trim();
          const source = sourceElement.href;
          dataArray.push({ title, schedule, source });
        }
      }
      return dataArray
    });

    await browser.close()

    let newDataCount = 0;
    let newDataArr = []
    for (const newData of data) {
      const existingData = await announcementModel.findOne({ title: newData.title });
      const dateObject = new Date(newData.schedule)
      console.log(dateObject)
      console.log(newData)
      if (!isNaN(dateObject.getTime()) && !existingData) { // check if date is valid and data doesn't already exist
        await announcementModel.create({
          title: newData.title,
          source: newData.source,
          schedule: dateObject
        });
        newDataCount++;
        newDataArr.push(newData)
      } else {
        console.log(`Skipping announcement with invalid date: ${newData.title}`);
      }
    }    
    console.log(`Added ${newDataCount} new announcement.`)
  } catch (error) {
    console.log(error)
  }
}) 
);

module.exports = {
    getAnnouncementAll,scrapeAnnouncement
}