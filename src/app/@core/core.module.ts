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
import { ApiService } from './services/api.service';
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
const DATA_SERVICES: any[] = [{ provide: UserData, useClass: UserService }];

const HTTP_INTERCEPTOR: any[] = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

export const NB_CORE_PROVIDERS = [
  ApiService,
  TestService,
  AccessControlProviderService,
  ...DATA_SERVICES,
  ...HTTP_INTERCEPTOR,
  AnalyticsService,
  { provide: AuthGuardService, useClass: AuthGuardService },
  {provide:UserService,useClass:ApiUserService},
  AnalyticsService,
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
    MatProgressSpinnerModule
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
