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
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService) { }



  ngOnInit() {
    this.inputForm = this.fb.group({
      'select': ['', Validators.required],
      'phone': ['', Validators.required]
    })
  }
  registerApi() {
    this.body = {
      'phone': this.inputForm.controls.select.value + this.inputForm.controls.phone.value
    };

    this.commonService.register(this.body).subscribe((res: any[]) => {
      if (this.inputForm.valid) {
        this.router.navigate(['/verifications'])
      }
    });
  }


  get select() {
    return this.inputForm.get('select');
  }
  get phone() {
    return this.inputForm.get('phone');
  }

}
