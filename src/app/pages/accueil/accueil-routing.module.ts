import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'ac',
    pathMatch: 'full',
  },*/
  {path:'',component:AccueilComponent}
];
const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
