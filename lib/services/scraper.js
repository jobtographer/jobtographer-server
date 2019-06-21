const puppeteer = require('puppeteer');

const scraper = async(path)=>{

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
    );
    const page = await browser.newPage();
    await page.goto(path);
    const originalPosting = await page.evaluate(
    //eslint-disable-next-line
    () => document.querySelector('div.jobDescriptionContent').textContent
    );
    await browser.close();
  
    return originalPosting;
  } catch(error){
    return `ERROR:${error}`;
  }
};



module.exports = scraper;
