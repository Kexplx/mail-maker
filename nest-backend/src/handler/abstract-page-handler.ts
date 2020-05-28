import { Page } from 'puppeteer';
import { Result } from 'src/models/result.model';
import { RandomStringGenerator } from 'src/helpers/random-string-generator';

export abstract class AbstractPageHandler {
  protected readonly page: Page;
  protected readonly rsg: RandomStringGenerator;

  constructor(page: Page) {
    this.page = page;
    this.rsg = new RandomStringGenerator();
  }

  abstract async getCaptchaLink(): Promise<string>;
  abstract async fill(captcha: string): Promise<Result>;
}
