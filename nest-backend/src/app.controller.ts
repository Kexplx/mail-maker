import { Controller, Get, Post, Query, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Provider } from './models/enums/provider.enum';
import { Task } from './models/task.model';
import { Answer } from './models/answer.model';
import { Result } from './models/result.model';

@Controller()
export class AppController {
  private readonly sessionIdRegex = /^[0-9a-zA-Z]{20}$/;
  private readonly captchaRegex = /^[0-9a-zA-Z]{4,8}$/;

  constructor(private appService: AppService) {}

  @Get('crawl')
  async crawl(@Query('provider') provider: Provider): Promise<Task> {
    if (this.validProvider(provider)) {
      const task = await this.appService.crawl(provider);

      if (task) {
        return task;
      } else {
        throw new HttpException("Coudln't crawl registration site", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException('Invalid provider specified', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('answer')
  async answer(@Body() answer: Answer): Promise<Result> {
    if (this.validAnswer(answer)) {
      const result = await this.appService.insertAnser(answer);

      if (result) {
        return result;
      } else {
        throw new HttpException('Invalid captcha', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Invalid captcha or sessionId', HttpStatus.BAD_REQUEST);
    }
  }

  private validAnswer({ captcha, sessionId }: Answer) {
    return this.captchaRegex.test(captcha) && this.sessionIdRegex.test(sessionId);
  }

  private validProvider(provider: Provider) {
    return Object.values(Provider).includes(provider);
  }
}
