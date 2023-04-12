import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthGuard } from './auth.guard';
import { CommonService } from '../services/commonService';
import { TranslationLoaderService } from '../services/translationLoader.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ApiManager } from '../services/api-manager.service';
import { SecurityAccessDirective } from '../services/security-access.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// ----------------------------------------------------------------------------
import {AuthenticationsModule} from './authentications/authentications.module';
import { HeaderFooterModule } from './header-footer/header-footer.module'
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SecurityAccessDirective
  ],
  imports: [
    BrowserAnimationsModule ,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClientModule]
      }
  }),
  AngularFontAwesomeModule,
  AppRoutingModule,
  AuthenticationsModule,
  HeaderFooterModule,
  ],
  providers: [AuthGuard, CommonService, TranslationLoaderService, ApiManager],
  bootstrap: [AppComponent]
})
export class AppModule { }

