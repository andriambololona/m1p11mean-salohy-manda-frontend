import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { ApiUserService } from 'src/app/@core/services/api/api.user.service';
import { UserService } from 'src/app/@core/services/user.service';
import { ApiService } from 'src/app/@core/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiManagerService } from 'src/app/@core/services/api/api-manager.service';
import { ManagerService } from 'src/app/@core/services/manager.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    HttpClientModule
  ],
  providers:[{provide:UserService,useClass:ApiUserService},
    {provide:ManagerService,useClass:ApiManagerService},
    ApiService]
})
export class AccueilModule { }
