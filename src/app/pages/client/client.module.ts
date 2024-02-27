import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { FormulaireRendezVousComponent } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous.component';
import { HistoriqueRendezVousComponent } from './rendez-vous/historique-rendez-vous/historique-rendez-vous.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormulaireRendezVousRoutingModule } from './rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous-routing.module';
import {MatCardModule} from '@angular/material/card';
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
    PreferenceEmployeComponent
  ],
  imports: [
      CommonModule,
      ClientRoutingModule,
      HttpClientModule,
      MatDatepickerModule,
      MatInputModule,
      /*NgxMatDatetimePickerModule,
      NgxMatNativeDateModule,
      NgxMatTimepickerModule,*/
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatDividerModule,
      DragDropModule,
      MatTableModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatIconModule,
      

      //FormulaireRendezVousModule,
  ],
  providers: [
   // { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
   {provide:CustomAuthService}
  ]
})
export class ClientModule { }
