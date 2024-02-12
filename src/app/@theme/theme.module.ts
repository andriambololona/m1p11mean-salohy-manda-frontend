import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
/*import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';*/
import {
  FooterComponent,
  HeaderComponent,
} from './components';
import {
  OneColumnLayoutComponent,
} from './layouts';

import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeRoutingModule } from './theme-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiUserService } from '../@core/services/api/api.user.service';
import { UserService } from '../@core/services/user.service';
import { ApiService } from '../@core/services/api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const NB_MODULES = [
  ThemeRoutingModule,
  JsonPipe,
  FormsModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatMenuModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTreeModule,
  MatDialogModule,
  FormsModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent,
];
/*const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  EnumToArrayPipe
];*/

@NgModule({
  imports: [CommonModule,FormsModule, ...NB_MODULES],
  //exports: [CommonModule, ...PIPES, ...COMPONENTS],
  exports: [CommonModule, ...COMPONENTS],
  //declarations: [...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS],


})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return <ModuleWithProviders<ThemeModule>>{
      ngModule: ThemeModule,
      providers: [
        {provide:UserService,useClass:ApiUserService},
        ApiService
      ],
    };
  }
}
