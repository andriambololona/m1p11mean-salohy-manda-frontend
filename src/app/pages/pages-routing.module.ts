import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'employe',
        loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule),
      },
      {
        path: 'manager',
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
