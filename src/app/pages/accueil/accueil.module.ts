import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { ApiUserService } from 'src/app/@core/services/api/api.user.service';
import { UserService } from 'src/app/@core/services/user.service';
import { ApiService } from 'src/app/@core/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiManagerService } from 'src/app/@core/services/api/api-manager.service';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { CustomAuthService } from 'src/app/@core/services/custom-auth-service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccueilComponent } from './accueil.component';
import { ModalDescriptionServiceComponent } from './modal-description-service/modal-description-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ModalDescriptionServiceComponent
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule
    
  ],
  providers: [
    { provide: UserService, useClass: ApiUserService },
    { provide: ManagerService, useClass: ApiManagerService },
    { provide: CustomAuthService },
    ApiService,
  ],
})
export class AccueilModule {}
