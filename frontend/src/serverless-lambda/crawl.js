const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");
require("encoding");

exports.handler = async function (event, context, callback) {
  try {
    // Parse data sent from frontend and validate
    const { trackUrl } = JSON.parse(event.body);
    if (!trackUrl) {
      return callback(null, {
        statusCode: 400,
        body: "No url detected",
      });
    }

    // Crawling starts here
    console.log("crawling starts");

    // // production
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    });

    // development
    // const browser = await chromium.puppeteer.launch({
    //   executablePath: await chromium.executablePath,
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   headless: chromium.headless,
    // });

    const page = await browser.newPage();
    await page.goto(trackUrl, { waitUntil: "networkidle0" });

    const crawledProduct = await page.evaluate(() => {
      let actualPrice = 0;

      const image = document.querySelector("#landingImage")
        ? document.querySelector("#landingImage").src
        : null;
      const ourPrice = document.querySelector("#priceblock_ourprice");
      const salePrice = document.querySelector("#priceblock_saleprice");
      const dealPrice = document.querySelector("#priceblock_dealprice");

      if (ourPrice) {
        actualPrice = +ourPrice.innerText.substring(1);
      } else if (salePrice) {
        actualPrice = +salePrice.innerText.substring(1);
      } else if (dealPrice) {
        actualPrice = +dealPrice.innerText.substring(1);
      }

      return {
        image,
        actualPrice,
      };
    });

    // Crawling ends here
    await browser.close();
    console.log("crawling ends");

    // Return crawled data
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Complete product crawling successfully",
        product: crawledProduct,
      }),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: "Crawling failed",
    });
  }
};
