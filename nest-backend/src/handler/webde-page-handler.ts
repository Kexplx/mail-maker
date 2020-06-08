import { AbstractPageHandler } from './abstract-page-handler';
import { Result } from 'src/models/result.model';

export class WebdePageHandler extends AbstractPageHandler {
  private readonly url = 'https://registrierung.web.de/';

  async getCaptchaLink(): Promise<string> {
    await this.page.goto(this.url);
    await this.page.waitForNavigation();

    const captchaImg = await this.page.$('#captchaImage');
    const captchaLink = await this.page.evaluate((element: HTMLImageElement) => element.src, captchaImg);

    return captchaLink;
  }

  async fill(captcha: string): Promise<Result | null> {
    const username = this.rsg.generate(10);
    const password = this.rsg.generate(15);

    await this.page.type('[data-test="check-email-availability-email-input"]', username);
    await this.page.type('[data-test="first-name-input"]', 'Hans');
    await this.page.type('[data-test="last-name-input"]', 'Müller');
    await this.page.click('[data-test="gender-radio-group"] input');
    await this.page.type('[data-test="postal-code-input"]', '60306');
    await this.page.type('[data-test="town-input"]', 'Frankfurt');
    await this.page.type('[data-test="street-and-number-input"]', this.rsg.generate(10));
    await this.page.type('[data-test="day"]', '15');
    await this.page.type('[data-test="month"]', '4');
    await this.page.type('[data-test="year"]', '1980');
    await this.page.type('[data-test="choose-password-input"]', password);
    await this.page.type('[data-test="choose-password-confirm-input"]', password);
    await this.page.type('[data-test="mobile-phone-input"]', '1738643985');
    await this.page.type('[data-test="captcha-input"]', captcha);
    await this.page.click('[data-test="create-mailbox-create-button"]', { delay: 3000 });

    const invalidCaptcha = await this.page.evaluate(() => {
      return document.body.innerHTML.includes('Zeichenfolge eingeben');
    });

    if (invalidCaptcha) {
      return { username, password };
    }

    return null;
  }
}
