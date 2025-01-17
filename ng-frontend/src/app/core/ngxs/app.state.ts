import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Crawl, ProvideAnswer } from './app.actions';
import { Answer } from '../models/answer.model';
import { Task } from '../models/task.model';
import { Result } from '../models/result.model';

export interface AppStateModel {
  crawlLoading: boolean;
  crawlFailed: boolean;
  answerLoading: boolean;
  answerFailed: boolean;
  task: Task;
  result: Result;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    crawlLoading: false,
    crawlFailed: false,
    answerLoading: false,
    answerFailed: false,
    task: null,
    result: null,
  },
})
@Injectable()
export class AppState {
  constructor(private mailService: MailService) {}

  @Selector()
  static crawlLoading({ crawlLoading }: AppStateModel) {
    return crawlLoading;
  }

  @Selector()
  static crawlFailed({ crawlFailed }: AppStateModel) {
    return crawlFailed;
  }
  @Selector()
  static answerLoading({ answerLoading }: AppStateModel) {
    return answerLoading;
  }
  @Selector()
  static answerFailed({ answerFailed }: AppStateModel) {
    return answerFailed;
  }
  @Selector()
  static task({ task }: AppStateModel) {
    return task;
  }
  @Selector()
  static result({ result }: AppStateModel) {
    return result;
  }

  @Action(Crawl)
  crawl(ctx: StateContext<AppStateModel>, { provider }: Crawl) {
    ctx.patchState({ crawlLoading: true });

    this.mailService.crawl(provider).subscribe(
      task => ctx.patchState({ task, crawlFailed: false }),
      () => ctx.patchState({ crawlFailed: true }),
      () => ctx.patchState({ crawlLoading: false, crawlFailed: false }),
    );
  }

  @Action(ProvideAnswer)
  answer(ctx: StateContext<AppStateModel>, { captcha }: Answer) {
    const sessionId = ctx.getState().task.sessionId;
    ctx.patchState({ answerLoading: true });

    this.mailService.answer({ captcha, sessionId }).subscribe(
      result => ctx.patchState({ result, answerFailed: false }),
      () => ctx.patchState({ answerFailed: true }),
      () => ctx.patchState({ answerLoading: false }),
    );
  }
}
