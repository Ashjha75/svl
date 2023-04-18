import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  personalInfo: FormGroup;
  val = '';
  toggleoption = false;
  toggleoption2 = false;
  body: {}
  constructor(private fb: FormBuilder, private router: Router, private _commonservice: CommonService) { }

  ngOnInit() {
    this.personalInfo = this.fb.group({
      image: ['', Validators.required],
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      checks1: ['2'],
      checks2: ['1']
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
  // onClicked3() {
  //   this.toggleoption = false;
  //   this.toggleoption2 = false;

  // }
  SignupApiCall() {
    this.body = {
      'img': this.personalInfo.controls.image.value,
      'fname': this.personalInfo.controls.fname.value,
      'mname': this.personalInfo.controls.mname.value,
      'lname': this.personalInfo.controls.lname.value,
      'date': this.personalInfo.controls.date.value,
      'gender': this.personalInfo.controls.gender.value,
      'checks1': this.personalInfo.controls.checks1.value,
      'checks2': this.personalInfo.controls.checks2.value,

    }
    console.table(this.body)
    this.router.navigate(['/address']);
    this._commonservice.SignUpPersonal(this.body, (localStorage.getItem("accessmedium"))).subscribe((resp) => {
      console.log(resp)
    })


  }

  get fname() {
    return this.personalInfo.get('fname');
  }
  get mname() {
    return this.personalInfo.get('mname');
  }
  get lname() {
    return this.personalInfo.get('lname');
  }
  get date() {
    return this.personalInfo.get('date');
  }
  get gender() {
    return this.personalInfo.get('gender');
  }
}
