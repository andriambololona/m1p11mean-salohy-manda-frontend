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

@NgModule({
  declarations: [
    PersonnelComponent,
    ModalDetailsPersonnelComponent
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
    MatTooltipModule
  ]
})
export class ManagerModule { }
