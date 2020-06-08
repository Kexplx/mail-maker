import { AbstractPageHandler } from './abstract-page-handler';
import { Result } from 'src/models/result.model';

export class WebdePageHandler extends AbstractPageHandler {
  private readonly url = 'https://registrierung.gmx.net/';

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

    await this.page.type('[data-test="check-email-availability-email-input"]', username, {
      delay: Math.floor(Math.random() * 100 + 100),
    });
    await this.page.type('[data-test="first-name-input"]', this.rsg.generate());
    await this.page.type('[data-test="last-name-input"]', this.rsg.generate());
    await this.page.click('[data-test="gender-radio-group"] input');
    await this.page.type('[data-test="postal-code-input"]', '60406');
    await this.page.type('[data-test="town-input"]', 'Frankfurt');
    await this.page.type('[data-test="street-and-number-input"]', this.rsg.generate());
    await this.page.type('[data-test="day"]', '12');
    await this.page.type('[data-test="month"]', '3');
    await this.page.type('[data-test="year"]', '1973');
    await this.page.type('[data-test="choose-password-input"]', password);
    await this.page.type('[data-test="choose-password-confirm-input"]', password);
    await this.page.type('[data-test="mobile-phone-input"]', '1738144985');
    await this.page.type('[data-test="captcha-input"]', captcha);
    await this.page.click('[data-test="create-mailbox-create-button"]');

    const invalidCaptcha = await this.page.evaluate(() => {
      return document.body.innerHTML.includes('Zeichenfolge eingeben');
    });

    if (invalidCaptcha) {
      return { username, password };
    }

    return null;
  }
}
