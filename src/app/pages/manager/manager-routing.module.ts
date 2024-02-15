import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { PersonnelComponent } from './personnel/personnel.component';

const routes: Routes = [
  {path:'',component:ManagerComponent},
  {path:'personnel',component:PersonnelComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
