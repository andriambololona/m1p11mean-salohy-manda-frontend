import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulaireRendezVousRoutingModule } from './formulaire-rendez-vous-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormulaireRendezVousComponent } from './formulaire-rendez-vous.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    FormulaireRendezVousRoutingModule,
    CommonModule,
    MatCardModule,
  ]
})
export class FormulaireRendezVousModule { }
