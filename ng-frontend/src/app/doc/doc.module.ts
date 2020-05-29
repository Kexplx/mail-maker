import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocumentationComponent } from './documentation/documentation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [CommonModule, SharedModule, DocRoutingModule],
})
export class DocModule {}
