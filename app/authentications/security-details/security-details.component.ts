import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';

@Component({
  selector: 'app-security-details',
  templateUrl: './security-details.component.html',
  styleUrls: ['./security-details.component.css']
})
export class SecurityDetailsComponent implements OnInit {
  hide = true;
  hide2 = true;
  body: {}
  securityForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private _commonService: CommonService) { }

  ngOnInit() {

    this.securityForm = this.fb.group({
      ques1: ['', Validators.required],
      ans1: ['', Validators.required],
      ques2: ['', Validators.required],
      ans2: ['', Validators.required],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      flexRadioDefault: ['No', Validators.required],
      flexRadioDefault2: ['No', Validators.required],
      flexRadioDefault3: ['No', Validators.required],
    })
  }
  SecurityApi() {
    this.body = {
      "ques1": this.securityForm.controls.ques1.value,
      "ans1": this.securityForm.controls.ans1.value,
      "ques2": this.securityForm.controls.ques2.value,
      "ans2": this.securityForm.controls.ans2.value,
      "pass1": this.securityForm.controls.pass1.value,
      "pass2": this.securityForm.controls.pass2.value,
      "flexRadioDefault": this.securityForm.controls.flexRadioDefault.value,
      "flexRadioDefault2": this.securityForm.controls.flexRadioDefault2.value,
      "flexRadioDefault3": this.securityForm.controls.flexRadioDefault3.value,
    }
    this._commonService.SignUpSecurity(this.body, localStorage.getItem("accesmedium")).subscribe((res) => {
      console.log(res)
    })
  }


  togglePassword(): void {
    this.hide = !this.hide;
  }
  togglePassword2(): void {
    this.hide2 = !this.hide2;
  }
  onSubmit() {
    console.table(this.securityForm.value);
    this.router.navigate(['/review']);
  }
  get ques1() {
    return this.securityForm.get('ques1');
  }
  get ans1() {
    return this.securityForm.get('ans1');
  }
  get ques2() {
    return this.securityForm.get('ques2');
  }
  get ans2() {
    return this.securityForm.get('ans2');
  }

  get pass1() {
    return this.securityForm.get('pass1');
  }
  get pass2() {
    return this.securityForm.get('pass2');
  }


}
