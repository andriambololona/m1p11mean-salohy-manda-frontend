import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { FormulaireRendezVousComponent } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous.component';
import { HistoriqueRendezVousComponent } from './rendez-vous/historique-rendez-vous/historique-rendez-vous.component';

const routes: Routes = [
  {path:'',component:ClientComponent},
  {path:'prise_rendez_vous',component:FormulaireRendezVousComponent},
  {path:'historique_rendez_vous',component:HistoriqueRendezVousComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
