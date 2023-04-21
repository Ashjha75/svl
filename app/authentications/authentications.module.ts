import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationsRoutingModule } from './authentications-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { VerificationsComponent } from './verifications/verifications.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AddressIdentificationComponent } from './address-identification/address-identification.component';
import { SecurityDetailsComponent } from './security-details/security-details.component';
import { ReviewRegisterationComponent } from './review-registeration/review-registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupMessageComponent } from './popup-message/popup-message.component';
@NgModule({
  declarations: [RegistrationComponent,VerificationsComponent, TermsConditionsComponent, PersonalInfoComponent, AddressIdentificationComponent, SecurityDetailsComponent, ReviewRegisterationComponent, PopupMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationsRoutingModule
  ],
  exports: [RegistrationComponent, VerificationsComponent, TermsConditionsComponent, PersonalInfoComponent, AddressIdentificationComponent, SecurityDetailsComponent, ReviewRegisterationComponent]
})
export class AuthenticationsModule { }
