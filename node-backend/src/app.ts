import express from 'express';
import puppeteer from 'puppeteer';
import { generate } from 'shortid';
import { PageItem } from './models/page-item.model';
import { Result } from './models/result.model';

const app = express()
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

const pages: PageItem[] = [];
const webDeUrl = 'https://registrierung.web.de/';

app.get('/load', async (_req, res) => {
  try {
    const id = generate();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36',
    );
    await page.goto(webDeUrl);
    await page.waitForNavigation();

    const captchaImg = await page.$('#captchaImage');
    const captchaUrl = await page.evaluate((element: HTMLImageElement) => element.src, captchaImg);

    pages.push({ id, page });
    res.send({ id, captchaUrl });
  } catch (error) {
    res.status(500).send('Having problems loading ' + webDeUrl);
  }
});

app.post('/answer', async (req, res) => {
  const { id, answer } = req.body;
  const page = pages.find(x => x.id == id)?.page;

  if (!page) {
    return res.status(404).send('Invalid page id passed');
  }

  const result = await page.evaluate(answer => {
    const randString = (n = 7, includeNumbers = false) => {
      const alphabet =
        'abcdefghijklmdanopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVXYZ' +
        (includeNumbers ? '123456789' : '');
      let result = '';
      for (let i = 0; i < n; i++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
      }

      return result;
    };

    const type = (index: number, value: string = randString()) => {
      elements[index].value = value;
      elements[index].dispatchEvent(new Event('input'));
    };

    const result: Result = {
      username: randString(10, true),
      passowrd: randString(20, true),
      created: Date.now(),
    };

    const elements = document.querySelectorAll('input');

    type(0, result.username);
    elements[2].click();
    type(3);
    type(4);
    type(5, '10115');
    type(6, 'Berlin');
    type(7);
    type(8, '4');
    type(9, '4');
    type(10, '1990');
    type(12, result.passowrd);
    type(13, result.passowrd);
    type(15, '1738323981');
    type(18, answer);

    return result;
  }, answer);

  await page.click('.terms-and-conditions__cta-button');

  res.send(result);
});

app.listen(process.env.PORT || 3000);
