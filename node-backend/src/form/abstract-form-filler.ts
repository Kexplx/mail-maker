import { RandomStringGenerator } from '../helpers/random-string-generator';
import { Result } from '../models/result.model';

/**
 * Serves as a base class for filling out html forms
 */
export abstract class AbstractFormFiller {
  private inputs: HTMLInputElement[];
  protected stringGenerator: RandomStringGenerator;

  constructor(inputs: HTMLInputElement[]) {
    this.inputs = inputs;
    this.stringGenerator = new RandomStringGenerator();
  }

  /**
   * Sets the value of the specified input element and dispatches an input event on it
   *
   * @param index The index of the input element
   * @param value The string value to write as element.value
   */
  protected set(index: number, value = this.stringGenerator.generate()) {
    this.inputs[index].value = value;
    this.inputs[index].dispatchEvent(new Event('input'));
  }

  protected click(index: number) {
    this.inputs[index].dispatchEvent(new Event('click'));
  }

  abstract fill(captcha: string): Result;
}
