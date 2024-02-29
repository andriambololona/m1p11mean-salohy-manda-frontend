import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRoutingModule } from './employe-routing.module';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiviComponent } from './suivi/suivi.component';

import { ProfilComponent } from './profil/profil.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApiPrestationService } from 'src/app/@core/services/api/api.prestation.service';
import { PrestationService } from 'src/app/@core/services/prestation.service';



@NgModule({
  declarations: [
    RendezVousComponent,

    SuiviComponent,

    ProfilComponent

  ],
  imports: [
    CommonModule,
    EmployeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
      MatNativeDateModule,

  ],
  providers:[ {provide:PrestationService,useClass:ApiPrestationService},]
})
export class EmployeModule { }
