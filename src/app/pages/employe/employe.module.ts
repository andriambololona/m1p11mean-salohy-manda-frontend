import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRoutingModule } from './employe-routing.module';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';


@NgModule({
  declarations: [
    RendezVousComponent
  ],
  imports: [
    CommonModule,
    EmployeRoutingModule
  ]
})
export class EmployeModule { }
