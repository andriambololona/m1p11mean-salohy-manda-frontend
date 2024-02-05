import { ModuleWithProviders, NgModule, Optional, Provider, SkipSelf } from "@angular/core";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import { AnalyticsService } from "./utils/analytics.service";
import { environment } from "src/environments/environment";
import { ApiService } from "./services/api.service";
import { RoleProvider } from "./services/role-provider.service";
import { CustomAccessChecker } from "./services/custom-access-checker";
import { UserData } from "./data/users";
import { UserService } from "./mock/users.service";
import { AuthInterceptor } from "../interceptors/auth_interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TestService } from "./services/test.service";
import { AccessControlProviderService } from "./services/access-control-provider.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import { AuthModule } from "./module/auth/auth.module";
import { CommonModule } from "@angular/common";
import { AuthGuardService } from "./services/auth-guard.service";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

const DATA_SERVICES: any[] = [
  { provide: UserData, useClass: UserService },
];

const HTTP_INTERCEPTOR: any[] = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]

export const NB_CORE_PROVIDERS = [
  ApiService, TestService,AccessControlProviderService,
  ...DATA_SERVICES,
  ...HTTP_INTERCEPTOR,
  AnalyticsService,
  { provide: AuthGuardService, useClass: AuthGuardService },
  AnalyticsService
]

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    MatButtonModule, 
    MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatFormFieldModule, MatSelectModule
  ],

  exports: [
    AuthModule,
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot(): ModuleWithProviders<CoreModule> {
    return <ModuleWithProviders<CoreModule>>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
