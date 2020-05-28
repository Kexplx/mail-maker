import { AbstractPageHandler } from './abstract-page-handler';
import { Provider } from 'src/models/enums/provider.enum';
import { WebdePageHandler } from './webde-page-handler';
import { Page } from 'puppeteer';

export class PageHandlerFactory {
  getHandler(provider: Provider, page: Page): AbstractPageHandler {
    switch (provider) {
      case Provider.WEBDE:
        return new WebdePageHandler(page);
      default:
        break;
    }
  }
}
