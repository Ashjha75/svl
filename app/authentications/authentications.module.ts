import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationsRoutingModule } from './authentications-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { VerificationsComponent } from './verifications/verifications.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [RegistrationComponent, VerificationsComponent, TermsConditionsComponent],
  imports: [
    CommonModule,
    AuthenticationsRoutingModule
  ],
  exports :[RegistrationComponent, VerificationsComponent, TermsConditionsComponent]
})
export class AuthenticationsModule { }
