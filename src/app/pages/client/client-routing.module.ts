import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { FormulaireRendezVousComponent } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous.component';
import { HistoriqueRendezVousComponent } from './rendez-vous/historique-rendez-vous/historique-rendez-vous.component';
import { PreferenceEmployeComponent } from './preference/preference-employe/preference-employe.component';
import { PreferenceServiceComponent } from './preference/preference-service/preference-service.component';
import { PrestationComponent } from './prestation/prestation.component';

const routes: Routes = [
  {path:'',component:ClientComponent},
  {path:'prise_rendez_vous',component:FormulaireRendezVousComponent},
  {path:'preference_employe',component:PreferenceEmployeComponent},
  {path:'preference_service',component:PreferenceServiceComponent},
  {path:'historique_rendez_vous',component:HistoriqueRendezVousComponent},
  {path:'prestation',component:PrestationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
