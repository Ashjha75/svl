import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationsRoutingModule } from './authentications-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { VerificationsComponent } from './verifications/verifications.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AddressIdentificationComponent } from './address-identification/address-identification.component';

@NgModule({
  declarations: [RegistrationComponent, VerificationsComponent, TermsConditionsComponent, PersonalInfoComponent, AddressIdentificationComponent],
  imports: [
    CommonModule,
    AuthenticationsRoutingModule
  ],
  exports:  [RegistrationComponent, VerificationsComponent, TermsConditionsComponent, PersonalInfoComponent, AddressIdentificationComponent]
})
export class AuthenticationsModule { }
