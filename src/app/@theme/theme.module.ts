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
import { FormsModule } from '@angular/forms';
import { ThemeRoutingModule } from './theme-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


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
      ],
    };
  }
}
