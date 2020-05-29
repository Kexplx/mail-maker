import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailGenerateRoutingModule } from './mail-generation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CrawlBoxComponent } from './components/mail-generation-overview/crawl-box/crawl-box.component';
import { ResultBoxComponent } from './components/mail-generation-overview/result-box/result-box.component';
import { SolveBoxComponent } from './components/mail-generation-overview/solve-box/solve-box.component';
import { MailGenerationOverviewComponent } from './components/mail-generation-overview/mail-generation-overview.component';

@NgModule({
  declarations: [
    CrawlBoxComponent,
    ResultBoxComponent,
    SolveBoxComponent,
    MailGenerationOverviewComponent,
  ],
  imports: [CommonModule, FormsModule, MailGenerateRoutingModule, SharedModule],
})
export class MailGenerationModule {}
