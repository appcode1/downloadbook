# downloadbook
In order to read the Chinese book offline at my kindle device, I'd like to download the book to my local computer from https://www.99csw.com/, and then copy the book to the Kindle device.

In order to run this javascript code, need to prepare the environment:
1. install nodejs from https://nodejs.org/
2. download this javascript file to the local machine, save it to some folder
3. from the Command line, go to the above folder, install puppeteer: <b>npm i puppeteer</b>

If you want to download a different book, just use any editor to open this javascript file and edit the following lines:

    const savedFileName = "xunqinji.txt";
    const indexUrl = "http://99csw.com/book/1501/index.htm";
    const bookFolderPath = "http://99csw.com/book/1501/";
    const startPageNumber = 40321;
    const endPageNumber =  40612;


In the command line, just run this javascript file to download the book:
    <b>node downloadbook.js</b>


Have fun!
