import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generate',
  },
  {
    path: 'generate',
    loadChildren: () =>
  {
    path: 'doc',
    loadChildren: () => import('./doc/doc.module').then(m => m.DocModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
