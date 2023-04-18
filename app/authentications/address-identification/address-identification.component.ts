import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';

@Component({
  selector: 'app-address-identification',
  templateUrl: './address-identification.component.html',
  styleUrls: ['./address-identification.component.css']
})
export class AddressIdentificationComponent implements OnInit {
  addressForm: FormGroup
  toggleoption = false
  body: {}
  toggleoption2 = false
  constructor(private fb: FormBuilder, private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      parish: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idtype: ['', Validators.required],
      idnum: ['', Validators.required],
      expiration: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      radio1: ['2', Validators.required],
      checks1: [''],
      checks2: [''],
    })
  }
  AddressApi() {
    this.body = {
      'street': this.addressForm.controls.street.value,
      'suite': this.addressForm.controls.suite.value,
      'parish': this.addressForm.controls.parish.value,
      'email': this.addressForm.controls.email.value,
      'idtype': this.addressForm.controls.idtype.value,
      'idnum': this.addressForm.controls.idnum.value,
      'expiration': this.addressForm.controls.expiration.value,
      'img1': this.addressForm.controls.img1.value,
      'img2': this.addressForm.controls.img2.value,
      'radio1': this.addressForm.controls.radio1.value,
      'checks1': this.addressForm.controls.checks1.value,
      'checks2': this.addressForm.controls.checks2.value,
    }
    this._commonService.SignUpAddress(this.body, localStorage.getItem("accesmedium")).subscribe((resp: any[]) => {
      if (this.addressForm.valid) {
        this.router.navigate(['/security']);
      }
      console.log(resp)

    })
  }
  onClicked() {
    this.toggleoption = !this.toggleoption;
    this.toggleoption2 = false;
  }
  onClicked2() {
    this.toggleoption2 = !this.toggleoption2;
    this.toggleoption = false;
  }
  onClicked3() {
    this.toggleoption = false;
    this.toggleoption2 = false;

  }

  get street() {
    return this.addressForm.get('street');
  }
  get suite() {
    return this.addressForm.get('suite');
  }
  get parish() {
    return this.addressForm.get('parish');
  }
  get email() {
    return this.addressForm.get('email');
  }
  get idtype() {
    return this.addressForm.get('idtype');
  }
  get idnum() {
    return this.addressForm.get('idnum');
  }
  get expiration() {
    return this.addressForm.get('expiration');
  }


}
