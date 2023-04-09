const asyncHandler = require("express-async-handler")
const puppeteer = require('puppeteer');
const  cron  = require('node-cron');
const {informationModel} = require("../models/informationModel.js")


const scrapInformation = asyncHandler(async (req,res) => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://ilkom.fmipa.uho.ac.id/informasi-lainnya/');

    const data = await page.$$eval('.gdlr-core-item-list', elements => {
      const dataArray = [];
      for (let element of elements) {
        const titleElement = element.querySelector('.gdlr-core-blog-title');
        const sourceElement = element.querySelector('.gdlr-core-blog-title a');
        const contentElement = element.querySelector('.gdlr-core-blog-content');
        if (titleElement && contentElement && sourceElement) {
          const title = titleElement.textContent.trim();
          const content = contentElement.textContent.trim();
          const source = sourceElement.href;
          dataArray.push({ title, content, source });
        }
      }
      return dataArray;
    });

    await browser.close();

    let newDataCount = 0;
    let newDataArr = []
    for (const newData of data) {
      const existingData = await informationModel.findOne({ title: newData.title });
      if (!existingData) {
        await informationModel.create(newData);
        newDataCount++;
        newDataArr.push(newData)
      }
    }

    res.status(200).json({
      statusCode: 200,
      message: `Added ${newDataCount} new data.`,
      data : newDataArr
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error,
    });
  }
});


  

const getInformationAll = asyncHandler(async (req,res) => {
    try {
        const data = await informationModel.find()
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

cron.schedule('0 * * * *',asyncHandler(async (req,res) => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://ilkom.fmipa.uho.ac.id/informasi-lainnya/');

    const data = await page.$$eval('.gdlr-core-item-list', elements => {
      const dataArray = [];
      for (let element of elements) {
        const titleElement = element.querySelector('.gdlr-core-blog-title');
        const sourceElement = element.querySelector('.gdlr-core-blog-title a');
        const contentElement = element.querySelector('.gdlr-core-blog-content');
        if (titleElement && contentElement && sourceElement) {
          const title = titleElement.textContent.trim();
          const content = contentElement.textContent.trim();
          const source = sourceElement.href;
          dataArray.push({ title, content, source });
        }
      }
      return dataArray;
    });

    await browser.close();

    let newDataCount = 0;
    let newDataArr = []
    for (const newData of data) {
      const existingData = await informationModel.findOne({ title: newData.title });
      if (!existingData) {
        await informationModel.create(newData);
        newDataCount++;
        newDataArr.push(newData)
      }
    }

    console.log(`Added ${newDataCount} new information.`)
  } catch (error) {
    console.log(error)
  }
}) );


module.exports = {
    getInformationAll,scrapInformation
}