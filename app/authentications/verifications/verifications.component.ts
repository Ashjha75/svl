import { Component, OnInit, Output } from '@angular/core';
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
  @Output() error;
  @Output() display;
  errorMessage = ""
  body: {};
  loader = false;
  timeRemaining = 60;
  intervalId: any;
  // accessMedium: string = 'internet';
  constructor(private fb: FormBuilder, private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.intervalId);
        this.timeRemaining = 0;
      }
    }, 1000)


    this.Verification = this.fb.group({
      verfcode: ['xxx', [Validators.required]],
      Refferal: ['']
    })
    this.loader = false;
  }

  verifyApi() {
    this.loader = true;
    this._commonService.otpVerify({ 'otp': this.Verification.controls.verfcode.value }, localStorage.getItem("accessmedium")).subscribe((resp) => {

      if (this.Verification.controls.verfcode.valid) {
        if (resp.body.message.errorMessage == "") {
          const data = resp.headers.get('access-medium');
          localStorage.setItem("accessmedium", data)
          this.router.navigate(['/terms']);
        }
        else {
          this.loader = false
          this.display = !this.display;
          this.errorMessage = resp.body.message.errorMessage;
        }
      }


    })

  }
  ResendApi() {
    this._commonService.resendOtp({ 'number': 9 }, localStorage.getItem("accessMedium")).subscribe((resp) => {
      this.timeRemaining = 60;
    })
  }




  get verfcode() {
    return this.Verification.get('verfcode');
  }

}
