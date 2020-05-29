import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'make',
  },
  {
    path: 'make',
    loadChildren: () => import('./make/make.module').then(m => m.MakeModule),
  },
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
