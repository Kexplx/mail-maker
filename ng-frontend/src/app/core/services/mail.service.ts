import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CaptchaTask } from './models/captcha-task.model';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Result } from './models/result.model';

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

  crawl(): Observable<CaptchaTask> {
    return this.http.get<CaptchaTask>(`${compileTimeSwitchedUrl}/crawl`).pipe(
      tap(data => console.log(`Received data from /crawl endpoint after GET: ${data}`)),
      catchError(err => throwError(`Error at /crawl endpoint after GET: ${err}`)),
    );
  }

  answer(answer: string): Observable<Result> {
    return this.http
      .post<Result>(`${compileTimeSwitchedUrl}/answer`, { answer })
      .pipe(
        tap(data => console.log(`Received data from /answer endpoint after POST: ${data}`)),
        catchError(err => throwError(`Error at /answer endpoint after POST: ${err}`)),
      );
  }
}
