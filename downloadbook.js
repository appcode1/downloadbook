/* download the book content from www.99csw.com */

//update the book index url:
const bookIndexUrl = "http://99csw.com/book/1501/index.htm";


const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const isoDatetimeString = (new Date()).toISOString().replace(/:/g,'');
  const outputFileName = "output_" + isoDatetimeString + ".txt";
  console.info("The output file will be: " + outputFileName);
  const file = fs.createWriteStream(outputFileName, {flags: 'a'});

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
    let value = await page.$eval('#content', e => e.innerText);
    file.write(value + "\n\n\n");
  }

  await browser.close();

  file.end();
  console.info("Done: File is saved as " + outputFileName);
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
