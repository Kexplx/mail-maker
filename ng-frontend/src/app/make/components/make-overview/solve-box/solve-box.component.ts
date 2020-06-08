import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solve-box',
  templateUrl: './solve-box.component.html',
  styleUrls: ['./solve-box.component.scss'],
})
export class SolveBoxComponent implements OnInit {
  @Select(AppState.task) task$: Observable<Task>;
  @Select(AppState.answerLoading) answerLoading$: Observable<boolean>;
  captchaValidator({ value }: AbstractControl) {
    const captchaRegex = /^[0-9a-zA-Z]{4,6}$/;

    if (!captchaRegex.test(value)) {
      return { invalidCaptcha: true };
    }

    return null;
  }

  ngOnInit() {}
}
