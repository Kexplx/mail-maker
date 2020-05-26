import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CaptchaTask } from './models/captcha-task.model';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Result } from './models/result.model';
import { Answer } from './models/answer.model';

const urls = {
  development: 'http://localhost:3000',
  production: 'http://localhost:3000',
};

const compileTimeSwitchedUrl = environment.production ? urls.production : urls.development;

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  /**
   * Makes a GET request to the backend to obtain a @link(CaptchaTask)
   *
   * Logs any received data inside tap() operator
   * Re-throws any errors that occur inside catchError() operator
   */
  crawl(): Observable<CaptchaTask> {
    const url = `${compileTimeSwitchedUrl}/crawl`;

    return this.http.get<CaptchaTask>(url).pipe(
      tap(data => console.log(`Received data from /crawl endpoint after GET: ${data}`)),
      catchError(err => throwError(`Error at /crawl endpoint after GET: ${err}`)),
    );
  }

  /**
   * Makes a POST request to the backend to obtain a @link(Result)
   *
   * Includes the answer in the POST body
   *
   * @param answer An answer containing the given id and captchaAnswer
   */
  answer(answer: Answer): Observable<Result> {
    const url = `${compileTimeSwitchedUrl}/answer`;

    return this.http.post<Result>(url, answer).pipe(
      tap(data => console.log(`Received data from /answer endpoint after POST: ${data}`)),
      catchError(err => throwError(`Error at /answer endpoint after POST: ${err}`)),
    );
  }
}
