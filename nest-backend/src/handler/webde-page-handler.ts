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
}
