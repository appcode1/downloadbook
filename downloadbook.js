/* download the book content from www.99csw.com */

//update the book index url:
const bookIndexUrl = "https://www.99csw.com/book/1501/index.htm";


const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  let nowTime = new Date();
  const datetimeString = String(nowTime.getFullYear()) + String(nowTime.getMonth() + 1).padStart(2,'0') + String(nowTime.getDate()).padStart(2,'0') + "_"
    + String(nowTime.getHours()).padStart(2,'0') + String(nowTime.getMinutes()).padStart(2,'0') + String(nowTime.getSeconds()).padStart(2,'0');
  const tempOutputFileName = "output_" + datetimeString + ".txt";
  const file = fs.createWriteStream(tempOutputFileName, {flags: 'a'});

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.info('working on ' + bookIndexUrl);
  await page.goto(bookIndexUrl, {
    waitUntil: 'networkidle2',
  });
  await autoScroll(page);
  const bookName = await page.$eval('#book_info > h2', e => e.innerText);
  const bookAuthor = await page.$eval('#book_info > h4', e => e.innerText);
  file.write(bookIndexUrl + "\n\n\n");
  file.write(bookName + "\n\n" + bookAuthor + "\n\n\n");
  let value = await page.$eval('#dir', e => e.innerText);
  file.write(value + "\n\n\n");

  const pageUrls = await page.evaluate(() => Array.from(document.querySelectorAll('#dir > dd > a'), element => element.href));
 
  for(let i=0; i<pageUrls.length; i++)
  {
    console.info('working on ' + pageUrls[i]);
    await page.goto(pageUrls[i], {
      waitUntil: 'networkidle2',
    });
    await autoScroll(page);
    value = await page.$eval('#content', e => e.innerText);
    
    file.write(value.replace(/\n/g,"\n\n") + "\n\n\n");
  }

  await browser.close();

  file.end();

  nowTime = new Date();
  const outputFileName = bookName + "_99csw_" + String(nowTime.getFullYear()) + String(nowTime.getMonth() + 1).padStart(2,'0') + String(nowTime.getDate()).padStart(2,'0') + ".txt";
  fs.renameSync(tempOutputFileName, outputFileName);
  
  console.info("Done: The book text file is saved as " + outputFileName);
})();

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}
