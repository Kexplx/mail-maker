import { AbstractFormFiller } from './abstract-form-filler';
import { Result } from '../models/result.model';

/**
 * Fills the required input elements at https://registrierung.web.de/
 */
class WebdeFormFiller extends AbstractFormFiller {
  fill(captcha: string): Result {
    const username = this.stringGenerator.generate(10);
    const password = this.stringGenerator.generate(15);

    this.set(0, username);
    this.click(2);
    this.set(3);
    this.set(4);
    this.set(5, '10115');
    this.set(6, 'Berlin');
    this.set(7);
    this.set(8, '4');
    this.set(9, '4');
    this.set(10, '1990');
    this.set(12, password);
    this.set(13, password);
    this.set(15, '1738323981');
    this.set(18, captcha);

    return { password, username };
  }
}
