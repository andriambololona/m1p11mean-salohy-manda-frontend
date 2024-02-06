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
    PagesRoutingModule,
    //MatSidenavModule,
    CoreModule,
    ThemeModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: []
})
export class PagesModule { }
