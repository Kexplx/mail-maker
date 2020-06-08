import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { Answer } from '../models/answer.model';
import { Result } from '../models/result.model';

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

  crawl(provider: Provider): Observable<Task> {
    const url = `${compileTimeSwitchedUrl}/crawl`;

    let params = new HttpParams();
    params = params.append('provider', provider);

    return this.http
      .get<Task>(url, { params })
      .pipe(catchError(err => throwError(`Error at /crawl endpoint after GET: ${err}`)));
  }

  answer(answer: Answer): Observable<Result> {
    const url = `${compileTimeSwitchedUrl}/answer`;

    return this.http.post<Result>(url, answer).pipe(
      tap(data => console.log(`Received data from /answer endpoint after POST: ${data}`)),
      catchError(err => throwError(`Error at /answer endpoint after POST: ${err}`)),
    );
  }
}
