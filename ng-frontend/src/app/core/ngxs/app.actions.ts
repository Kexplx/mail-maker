import { Answer } from '../models/answer.model';
import { Provider } from '../models/enums/provider.enum';

export class Crawl {
  static readonly type = '[MakeComponent] Crawl registration page';
  constructor(public provider: Provider) {}
}

export class ProvideAnswer {
  static readonly type = '[MakeComponent] Answer the captcha';
  constructor(public captcha: string) {}
}
