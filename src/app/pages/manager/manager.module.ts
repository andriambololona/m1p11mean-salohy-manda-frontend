import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { PersonnelComponent } from './personnel/personnel.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PersonnelComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ManagerModule { }
