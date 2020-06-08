import { Page } from 'puppeteer';
import { AbstractPageHandler } from 'src/handler/abstract-page-handler';

export interface Session {
  id: string;
  handler: AbstractPageHandler;
}
