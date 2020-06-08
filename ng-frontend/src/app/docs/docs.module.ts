import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { DocsRoutingModule } from './docs-routing.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [CommonModule, SharedModule, DocsRoutingModule],
})
export class DocsModule {}
