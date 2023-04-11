import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationsRoutingModule } from './authentications-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { VerificationsComponent } from './verifications/verifications.component';

@NgModule({
  declarations: [RegistrationComponent, VerificationsComponent],
  imports: [
    CommonModule,
    AuthenticationsRoutingModule
  ],
  exports :[RegistrationComponent, VerificationsComponent]
})
export class AuthenticationsModule { }
