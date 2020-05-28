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
    await this.page.type('[data-test="first-name-input"]', 'Max');
    await this.page.click('[data-test="gender-radio-group"] input');
    await this.page.type('[data-test="last-name-input"]', 'Meier');
    await this.page.type('[data-test="postal-code-input"]', '10115');
    await this.page.type('[data-test="town-input"]', 'Berlin');
    await this.page.type('[data-test="street-and-number-input"]', 'Dorfstraße 34a');
    await this.page.type('[data-test="day"]', '11');
    await this.page.type('[data-test="month"]', '3');
    await this.page.type('[data-test="year"]', '1991');
    await this.page.type('[data-test="choose-password-input"]', password);
    await this.page.type('[data-test="choose-password-confirm-input"]', password);
    await this.page.type('[data-test="mobile-phone-input"]', '1738323981');
    await this.page.type('[data-test="captcha-input"]', captcha);
    this.page.click('[data-test="create-mailbox-create-button"]', { delay: 300 });

    return { username, password };
  }
}
