import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailGenerateRoutingModule } from './mail-generate-routing.module';
import { MailGenerationFormComponent } from './components/mail-generation-form/mail-generation-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MailGenerationFormComponent],
  imports: [CommonModule, FormsModule, MailGenerateRoutingModule, SharedModule],
})
export class MailGenerateModule {}
