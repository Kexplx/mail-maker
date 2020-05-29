import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-generation-overview',
  templateUrl: './mail-generation-overview.component.html',
  styleUrls: ['./mail-generation-overview.component.scss'],
})
export class MailGenerationOverviewComponent implements OnInit {
  constructor() {}

  ngAfterViewInit() {
    const layout = document.querySelector('app-mail-generation-overview .layout') as HTMLDivElement;
    layout.style.minHeight = '0';
  }
}
