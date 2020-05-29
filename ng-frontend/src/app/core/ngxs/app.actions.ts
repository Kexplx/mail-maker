import { Answer } from '../models/answer.model';

export class Crawl {
  static readonly type = '[MakeComponent] Crawl registration page';
}

export class ProvideAnswer {
  static readonly type = '[MakeComponent] Answer the captcha';
  constructor(public answer: Answer) {}
}
