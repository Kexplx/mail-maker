import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeOverviewComponent } from './components/make-overview/make-overview.component';

const routes: Routes = [{ path: '', component: MakeOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeRoutingModule {}
