import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Session } from './models/session.model';
import { RandomStringGenerator } from './helpers/random-string-generator';
import { Task } from './models/task.model';
import { Provider } from './models/enums/provider.enum';
import { Answer } from './models/answer.model';
import { Result } from './models/result.model';
import { PageHandlerFactory } from './handler/page-handler-factory';

const sessions: Session[] = [];

@Injectable()
export class AppService {
  private stringGenerator = new RandomStringGenerator();
  private handlerFactory = new PageHandlerFactory();

  async crawl(provider: Provider): Promise<Task | null> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36');

    const handler = this.handlerFactory.getHandler(provider, page);
    const captchaLink = await handler.getCaptchaLink();

    if (!captchaLink) {
      return null;
    }

    const sessionId = this.stringGenerator.generate(20);
    sessions.push({ id: sessionId, handler });

    return { captchaLink, sessionId };
  }

  async insertAnser({ captcha, sessionId }: Answer): Promise<Result> {
    const session = sessions.find(session => session.id === sessionId);

    if (!session) {
      return null;
    }

    return await session.handler.fill(captcha);
  }
}
