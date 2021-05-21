# downloadbook
In order to read the Chinese book offline at my kindle device, I'd like to download the book content to my local computer from https://www.99csw.com/, and then copy the book text file to the Kindle device.

In order to run this javascript code at a local computer, need to prepare the environment:
1. install nodejs from https://nodejs.org/
2. download <a href="https://github.com/mrbqxu/downloadbook/blob/main/downloadbook.js">this javascript file</a> to the local machine, save it to some folder
3. from the Command line, go to the above folder, install puppeteer: <br/><b>npm i puppeteer</b>

If you want to download a different book, just use any editor to open this javascript file and edit the following line:

    //update the book index url:
    const bookIndexUrl = "http://99csw.com/book/1501/index.htm";



In the command line, just run this javascript file to download the book:
   <br/> <b>node downloadbook.js</b>

The output file is saved as <b>output_YYYYMMDD_hhmmss.txt</b>

Have fun!
