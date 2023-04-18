import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';
@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {
  Verification: FormGroup;
  body: {};

  // accessMedium: string = 'internet';
  constructor(private fb: FormBuilder, private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    this.Verification = this.fb.group({
      verfcode: ['xxx', [Validators.required]],
      Refferal: ['']
    })
  }

  verifyApi() {

    this._commonService.otpVerify({ 'otp': this.Verification.controls.verfcode.value }, localStorage.getItem("accesmedium")).subscribe((resp: any[]) => {
      if (this.Verification.controls.verfcode.valid) {
        this.router.navigate(['/terms']);
      }

    })

  }




  get verfcode() {
    return this.Verification.get('verfcode');
  }

}
