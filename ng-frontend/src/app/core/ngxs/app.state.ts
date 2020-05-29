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
  crawl(ctx: StateContext<AppStateModel>) {
    ctx.patchState({ crawlLoading: true });

    this.mailService.crawl().subscribe(
      task => ctx.patchState({ task, crawlFailed: false }),
      () => ctx.patchState({ crawlFailed: true }),
      () => ctx.patchState({ answerLoading: false }),
    );
  }

  @Action(ProvideAnswer)
  answer(ctx: StateContext<AppStateModel>, answer: Answer) {
    ctx.patchState({ answerLoading: true });

    this.mailService.answer(answer).subscribe(
      result => {
        ctx.patchState({ result, answerFailed: false });
      },
      () => ctx.patchState({ answerFailed: true }),
      () => ctx.patchState({ answerLoading: false }),
    );
  }
}
