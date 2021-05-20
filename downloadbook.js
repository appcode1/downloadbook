const puppeteer = require('puppeteer');
const fs = require('fs');

const bookName = "寻秦记";
const bookAuthor = "黄易";
const savedFileName = "xunqinji.txt";
const indexUrl = "http://99csw.com/book/1501/index.htm";
const bookFolderPath = "http://99csw.com/book/1501/";
const startPageNumber = 40321;
const endPageNumber =  40612;

(async () => {
  const file = fs.createWriteStream(savedFileName, {flags: 'a'});
  file.write(bookName + "\n\n" + bookAuthor + "\n\n\n");
  file.write(indexUrl + "\n\n\n");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('working on ' + indexUrl);
  await page.goto(indexUrl, {
    waitUntil: 'networkidle2',
  });
  await autoScroll(page);
  let value = await page.$eval('#dir', e => e.innerText);
  file.write(value + "\n\n\n");


 
  for(let i=startPageNumber; i<=endPageNumber; i++)
  {
    var thePageUrl = bookFolderPath + String(i) + ".htm";
    console.log('working on ' + thePageUrl);
    await page.goto(thePageUrl, {
      waitUntil: 'networkidle2',
    });
    await autoScroll(page);
    let value = await page.$eval('#content', e => e.innerText);
    file.write(value + "\n\n\n");
  }

  await browser.close();

  file.end();
  
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
