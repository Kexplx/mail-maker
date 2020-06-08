import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrawlBoxComponent } from './components/make-overview/crawl-box/crawl-box.component';
import { ResultBoxComponent } from './components/make-overview/result-box/result-box.component';
import { SolveBoxComponent } from './components/make-overview/solve-box/solve-box.component';
import { MakeOverviewComponent } from './components/make-overview/make-overview.component';
import { MakeRoutingModule } from './make-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [CrawlBoxComponent, ResultBoxComponent, SolveBoxComponent, MakeOverviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MakeRoutingModule,
    SharedModule,
  ],
})
export class MakeModule {}
