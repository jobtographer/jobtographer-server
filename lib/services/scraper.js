const puppeteer = require('puppeteer');

const scraper = async(path)=>{

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(path);
    const originalPosting = await page.evaluate(
    //eslint-disable-next-line
    () => document.querySelector('div.jobDescriptionContent').textContent
    );
    await browser.close();
  
    return originalPosting;
  } catch(error){
    return `Provided invalid job url:${path}`;
  }
};



module.exports = scraper;
