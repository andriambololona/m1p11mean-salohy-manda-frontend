import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { FormulaireRendezVousComponent } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous.component';
import { HistoriqueRendezVousComponent } from './rendez-vous/historique-rendez-vous/historique-rendez-vous.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormulaireRendezVousRoutingModule } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous-routing.module';
import {MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatDividerModule } from '@angular/material/divider';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormulaireRendezVousModule } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous.module';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CustomAuthService } from 'src/app/@core/services/custom-auth-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreferenceServiceComponent } from './preference/preference-service/preference-service.component';
import { PreferenceEmployeComponent } from './preference/preference-employe/preference-employe.component';
import { MatIconModule } from '@angular/material/icon';
import { PrestationComponent } from './prestation/prestation.component';
import { PrestationService } from 'src/app/@core/services/prestation.service';
import { ApiPrestationService } from 'src/app/@core/services/api/api.prestation.service';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
import { ModalPaiementComponent } from './prestation/modal-paiement/modal-paiement.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAjoutCompteComponent } from './prestation/modal-ajout-compte/modal-ajout-compte.component';
/*const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "l, LTS"
  },
  display: {
    dateInput: "l, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};*/

@NgModule({
  declarations: [
    FormulaireRendezVousComponent,
    HistoriqueRendezVousComponent,
    PreferenceServiceComponent,
    PreferenceEmployeComponent,
    PrestationComponent,
    ModalPaiementComponent,
    ModalAjoutCompteComponent
  ],
  imports: [
      CommonModule,
      ClientRoutingModule,
      HttpClientModule,

      /*NgxMatDatetimePickerModule,
      NgxMatNativeDateModule,
      NgxMatTimepickerModule,*/
      FormsModule,
      ReactiveFormsModule,
      MatRadioModule,
      MatCheckboxModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatDividerModule,
      DragDropModule,
      MatTableModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatDialogModule,
      MatInputModule,
     ReactiveFormsModule

      //FormulaireRendezVousModule,
  ],
  providers: [
   // { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
   {provide:CustomAuthService},
   {provide:PrestationService,useClass:ApiPrestationService},

  ]
})
export class ClientModule { }
