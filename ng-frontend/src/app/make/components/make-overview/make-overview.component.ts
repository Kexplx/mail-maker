import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-make-overview',
  templateUrl: './make-overview.component.html',
  styleUrls: ['./make-overview.component.scss'],
})
export class MakeOverviewComponent implements OnInit, AfterViewInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('MailMaker - Make');
  }

  ngAfterViewInit() {
    const layout = document.querySelector('app-make-overview .layout') as HTMLDivElement;
    layout.style.minHeight = '0';
  }
}
