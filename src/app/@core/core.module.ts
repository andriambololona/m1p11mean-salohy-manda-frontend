import {
  ModuleWithProviders,
  NgModule,
  Optional,
  Provider,
  SkipSelf,
} from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils/analytics.service';
import { environment } from 'src/environments/environment';
import { RoleProvider } from './services/role-provider.service';
import { CustomAccessChecker } from './services/custom-access-checker';
import { UserData } from './data/users';
import { AuthInterceptor } from '../interceptors/auth_interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TestService } from './services/test.service';
import { AccessControlProviderService } from './services/access-control-provider.service';
import { MatButtonModule } from '@angular/material/button';

import { AuthModule } from './module/auth/auth.module';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './module/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { ConfirmModalComponent } from './module/confirm-modal/confirm-modal.component';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { InputModalModule } from './module/input-modal/input-modal.module';
import { InputMessageModalComponent } from './module/input-modal/input-message-modal/input-message-modal.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { User } from './entity/user';
import { ApiUserService } from './services/api/api.user.service';
import { UserService } from './services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManagerService } from './services/manager.service';
import { ApiManagerService } from './services/api/api-manager.service';
import { CustomAuthService } from './services/custom-auth-service';
import { CustomAuthInterceptor } from '../interceptors/custom_auth.interceptor';
import { ApiService } from './services/api/api.service';
import { ClientService } from './services/client.service';
import { ApiClientService } from './services/api/api-client.service';
const DATA_SERVICES: any[] = [{ provide: UserData, useClass: UserService }];

const HTTP_INTERCEPTOR: any[] = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: CustomAuthInterceptor, multi: true }
];

export const NB_CORE_PROVIDERS = [
  ApiService,
  TestService,
  CustomAuthService,
  ...DATA_SERVICES,
  ...HTTP_INTERCEPTOR,
  AnalyticsService,

  {provide: AuthGuardService, useClass: AuthGuardService },
  {provide:UserService,useClass:ApiUserService},
  {provide:ClientService,useClass:ApiClientService},
  {provide:ManagerService,useClass:ApiManagerService},
];

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AuthModule
  ],

  exports: [AuthModule],

  declarations: [
    RegisterComponent,
    ConfirmModalComponent,

  ],

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot(): ModuleWithProviders<CoreModule> {
    return <ModuleWithProviders<CoreModule>>{
      ngModule: CoreModule,
      providers: [
                      ...NB_CORE_PROVIDERS,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose:true}},


                  ],
    };
  }
}
