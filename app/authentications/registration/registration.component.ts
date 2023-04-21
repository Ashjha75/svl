import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  inputForm: FormGroup;
  body = {};
  countryPhoneCode;
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService) { }



  ngOnInit() {
    this.inputForm = this.fb.group({
      'select': ['', Validators.required],
      'phone': ['', Validators.required]
    })
    this.commonService.lookUps({
      "lookups": ["countries", "gender", "parish", "idType", "securityQuestions", "phoneNumberCodes"]
    }).subscribe((res) => {
      this.commonService.lookup = res.body.countries;
      this.countryPhoneCode = res.body.phoneNumberCodes;
      this.commonService.gender = res.body.gender;
      this.commonService.parish = res.body.parish;
      this.commonService.idType = res.body.idType;
      this.commonService.securityQuestions = res.body.securityQuestions;
    })
  }


  registerApi() {
    this.body = {
      'phone': this.inputForm.controls.select.value + this.inputForm.controls.phone.value
    };

    this.commonService.register(this.body).subscribe((res) => {
      if (this.inputForm.valid) {
        if (res.body.message.errorMessage == "")
          this.router.navigate(['/verifications'])
      }
      const data = res.headers.get('access-medium');
      localStorage.setItem("accessmedium", data)

    });

  }


  get select() {
    return this.inputForm.get('select');
  }
  get phone() {
    return this.inputForm.get('phone');
  }

}
