console.log("*** Puppeteer Playground ***");

const tools = require('./common/getLinks.js');


console.log(tools.foo());


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


  const hackerNews = await browser.newPage()
  await hackerNews.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  })
  await hackerNews.goto('https://news.ycombinator.com/news')

  // execute standard javascript in the context of the hackerNews.
  const stories = await hackerNews.$$eval('a.storylink', anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
  console.log(stories)
  await hackerNews.tracing.stop()


  await browser.close();
})();

