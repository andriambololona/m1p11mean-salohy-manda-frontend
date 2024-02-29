import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employe.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { SuiviComponent } from './suivi/suivi.component';

import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {path:'',component:EmployeComponent},
  {path:'liste_rendez_vous',component:RendezVousComponent},

  {path:'suivi',component:SuiviComponent},

  {path:'profil',component:ProfilComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
