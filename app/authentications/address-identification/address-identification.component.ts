import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-identification',
  templateUrl: './address-identification.component.html',
  styleUrls: ['./address-identification.component.css']
})
export class AddressIdentificationComponent implements OnInit {
  addressForm:FormGroup
  toggleoption=false
  toggleoption2=false
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.addressForm=this.fb.group({
      street:['',Validators.required],
      suite:['',Validators.required],
      parish:['',Validators.required],
      email:['',Validators.required],
      idtype:['',Validators.required],
      idnum:['',Validators.required],
      expiration:['',Validators.required],
      img1:['',Validators.required],
      img2:['',Validators.required],
      radio1:['',Validators.required],
    })
  }
  onClicked(){
    this.toggleoption=!this.toggleoption;
    this.toggleoption2=false;
   }
  onClicked2(){
    this.toggleoption2=!this.toggleoption2;
    this.toggleoption=false;
   }
   onSubmit(){
    console.table(this.addressForm.value);
    
   }
   get street(){
    return this.addressForm.get('street');
   }
   get suite(){
    return this.addressForm.get('suite');
   }
   get parish(){
    return this.addressForm.get('parish');
   }
   get email(){
    return this.addressForm.get('email');
   }
   get idtype(){
    return this.addressForm.get('idtype');
   }
   get idnum(){
    return this.addressForm.get('idnum');
   }
   get expiration(){
    return this.addressForm.get('expiration');
   }
  

}
