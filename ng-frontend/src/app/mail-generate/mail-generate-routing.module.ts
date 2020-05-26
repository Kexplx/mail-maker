import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailGenerationOverviewComponent } from './components/mail-generation-overview/mail-generation-overview.component';

const routes: Routes = [{ path: '', component: MailGenerationOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailGenerateRoutingModule {}
