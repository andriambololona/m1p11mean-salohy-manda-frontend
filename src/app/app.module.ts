import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PagesModule } from './pages/pages.module';
import { ThemeModule } from './@theme/theme.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './@core/core.module';
import { ApiUserService } from './@core/services/api/api.user.service';
import { UserService } from './@core/services/user.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ClientModule } from './pages/client/client.module';
import { CustomAuthInterceptor } from './interceptors/custom_auth.interceptor';
import { CustomAuthService } from './@core/services/custom-auth-service';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    //PagesModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide:UserService,useClass:ApiUserService},
    CustomAuthService,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
