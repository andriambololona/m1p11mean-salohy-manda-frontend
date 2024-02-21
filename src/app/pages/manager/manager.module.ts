import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { PersonnelComponent } from './personnel/personnel.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalDetailsPersonnelComponent } from './personnel/modal-details-personnel/modal-details-personnel.component';
import { ServicesComponent } from './services/services.component';
import { CustomAuthService } from 'src/app/@core/services/custom-auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalAjoutServiceComponent } from './services/modal-ajout-service/modal-ajout-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalDetailServiceComponent } from './services/modal-detail-service/modal-detail-service.component';




@NgModule({
  declarations: [
    PersonnelComponent,
    ModalDetailsPersonnelComponent,
    ServicesComponent,
    ModalAjoutServiceComponent,
    ModalDetailServiceComponent,
   

  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
   
  ],
  providers:[{provide:CustomAuthService}]
})
export class ManagerModule { }
