import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solve-box',
  templateUrl: './solve-box.component.html',
  styleUrls: ['./solve-box.component.scss'],
})
export class SolveBoxComponent implements OnInit {
  captchaValidator({ value }: AbstractControl) {
    const captchaRegex = /^[0-9a-zA-Z]{4,6}$/;

    if (!captchaRegex.test(value)) {
      return { invalidCaptcha: true };
    }

    return null;
  }

  ngOnInit() {}
}
