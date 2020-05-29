import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Crawl } from './app.actions';
import { CaptchaTask } from '../services/models/captcha-task.model';
import { Result } from '../services/models/result.model';
import { MailService } from '../services/mail.service';

export interface AppStateModel {
  crawlDispatched: boolean;
  answerDispatched: boolean;

  crawlFailed: boolean;
  answerFailed: boolean;

  captchaTask: CaptchaTask;
  result: Result;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    answerDispatched: false,
    crawlDispatched: false,
    crawlFailed: false,
    answerFailed: false,
    captchaTask: null,
    result: null,
  },
})
@Injectable()
export class AppState {
  constructor(private mailService: MailService) {}

  @Action(Crawl)
  crawl(ctx: StateContext<AppStateModel>, action: Crawl) {
    this.mailService.crawl().subscribe((task: CaptchaTask) => {
      ctx.patchState({ captchaTask: task });
    });
  }
}
