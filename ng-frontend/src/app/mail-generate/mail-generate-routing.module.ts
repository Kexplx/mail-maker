import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailGenerationFormComponent } from './components/mail-generation-form/mail-generation-form.component';

const routes: Routes = [{ path: '', component: MailGenerationFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailGenerateRoutingModule {}
