import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mail-generation-overview',
  templateUrl: './mail-generation-overview.component.html',
  styleUrls: ['./mail-generation-overview.component.scss'],
})
export class MailGenerationOverviewComponent implements OnInit, AfterViewInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('MailMaker / Make');
  }

  ngAfterViewInit() {
    const layout = document.querySelector('app-mail-generation-overview .layout') as HTMLDivElement;
    layout.style.minHeight = '0';
  }
}
