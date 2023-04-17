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
  constructor(private fb: FormBuilder, private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    this.Verification = this.fb.group({
      verfcode: ['xxx', [Validators.required]],
      Refferal: ['']
    })
  }
  verifyApi() {
    console.log("hell")
    this._commonService.otpVerify({ 'p': 1234 }).subscribe((resp: any[]) => {
      if (this.Verification.valid) {
        this.router.navigate(['/terms']);
      }
      console.log(resp)
    })

  }




  get verfcode() {
    return this.Verification.get('verfcode');
  }

}
