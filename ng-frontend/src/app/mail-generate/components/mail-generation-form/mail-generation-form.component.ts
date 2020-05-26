import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-generation-form',
  templateUrl: './mail-generation-form.component.html',
  styleUrls: ['./mail-generation-form.component.scss'],
})
export class MailGenerationFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  private captchaRegex = /^[a-zA-Z0-9]{4,7}$/;
}
