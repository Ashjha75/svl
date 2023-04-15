import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { VerificationsComponent } from './verifications/verifications.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AddressIdentificationComponent } from './address-identification/address-identification.component';
import { SecurityDetailsComponent } from './security-details/security-details.component';
import { ReviewRegisterationComponent } from './review-registeration/review-registeration.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'verifications', component: VerificationsComponent},
  {path:'terms',component:TermsConditionsComponent},
  {path:'personalinfo',component:PersonalInfoComponent},
  {path :'address',component : AddressIdentificationComponent},
  {path:'security',component:SecurityDetailsComponent},
  {path:'review',component:ReviewRegisterationComponent},
  {path:'**',component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationsRoutingModule { }
