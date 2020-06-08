import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/core/ngxs/app.state';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { ProvideAnswer } from 'src/app/core/ngxs/app.actions';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-solve-box',
  templateUrl: './solve-box.component.html',
  styleUrls: ['./solve-box.component.scss'],
})
export class SolveBoxComponent implements OnInit {
  @Select(AppState.task) task$: Observable<Task>;
  @Select(AppState.answerLoading) answerLoading$: Observable<boolean>;
  captcha = new FormControl(null, [this.captchaValidator, Validators.required]);
  captchaLink: SafeUrl;

  constructor(private store: Store, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.task$.subscribe(task => {
      this.captchaLink = this.sanitizer.bypassSecurityTrustUrl(task?.captchaLink);
    });
  }

  captchaValidator({ value }: AbstractControl) {
    const captchaRegex = /^[0-9a-zA-Z]{4,6}$/;

    if (!captchaRegex.test(value)) {
      return { invalidCaptcha: true };
    }

    return null;
  }

  onSubmit() {
    this.store.dispatch(new ProvideAnswer(this.captcha.value));
  }
}
