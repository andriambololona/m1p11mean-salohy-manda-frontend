import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PagesComponent } from './pages.component';
import { ClientComponent } from './client/client.component';
import { EmployeComponent } from './employe/employe.component';
import { ManagerComponent } from './manager/manager.component';
import { ThemeModule } from '../@theme/theme.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccueilComponent } from './accueil/accueil.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CoreModule } from '../@core/core.module';
import { ApiUserService } from '../@core/services/api/api.user.service';
import { UserService } from '../@core/services/user.service';
import { AccueilModule } from './accueil/accueil.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientModule } from './client/client.module';
import { BrowserModule } from '@angular/platform-browser';
import { CustomAuthService } from '../@core/services/custom-auth-service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    PagesComponent,
    ClientComponent,
    EmployeComponent,
    ManagerComponent,
    AccueilComponent,
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    PagesRoutingModule,
    HttpClientModule,
    ThemeModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    AccueilModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    //ClientModule
  ],
  providers: [{provide:UserService,useClass:ApiUserService}]
})
export class PagesModule { }
