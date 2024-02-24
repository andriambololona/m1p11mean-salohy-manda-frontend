import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ServicesComponent } from './services/services.component';
import { StatistiqueComponent } from './statistique/statistique.component';

const routes: Routes = [
  {path:'',component:ManagerComponent},
  {path:'personnel',component:PersonnelComponent},
  {path:'service',component:ServicesComponent},
  {path:'statistique',component:StatistiqueComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
