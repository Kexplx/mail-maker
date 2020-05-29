import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CrawlBoxComponent } from './components/make-overview/crawl-box/crawl-box.component';
import { ResultBoxComponent } from './components/make-overview/result-box/result-box.component';
import { SolveBoxComponent } from './components/make-overview/solve-box/solve-box.component';
import { MakeOverviewComponent } from './components/make-overview/make-overview.component';
import { MakeRoutingModule } from './make-routing.module';

@NgModule({
  declarations: [CrawlBoxComponent, ResultBoxComponent, SolveBoxComponent, MakeOverviewComponent],
  imports: [CommonModule, FormsModule, MakeRoutingModule, SharedModule],
})
export class MakeModule {}