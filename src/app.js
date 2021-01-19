console.log("*** Puppeteer Playground ***");

const puppeteer = require('puppeteer');
const url = process.argv[2];
if (!url) {
    throw "Please provide URL as a first argument";
}


(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
        ]
    });
  const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(5000); 
  await page.goto(url);
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();

