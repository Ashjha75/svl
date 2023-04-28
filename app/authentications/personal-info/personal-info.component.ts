import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  @Output() error;
  @Output() display;
  personalInfo: FormGroup;
  loader = false
  val = '';
  toggleoption = false;
  toggleoption2 = false;
  body: {}
  countries: {}
  genders: {}
  errorMessage: string;
  Radioparent = document.querySelector(".Radioparent") as HTMLInputElement;
  RadioCheck = document.querySelector(".RadioCheck") as HTMLInputElement;
  constructor(private fb: FormBuilder, private router: Router, private _commonservice: CommonService) { }

  ngOnInit() {
    this.personalInfo = this.fb.group({
      image: ['', Validators.required],
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      input1: [''],
      input2: [''],
      checks1: [''],
      checks2: ['']
    })
    this.countries = this._commonservice.lookup;
    this.genders = this._commonservice.gender;
    this.loader = false;
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (oFREvent: any) => {

        const fileType = file.type.split('/')[1];
        if (fileType == 'jpeg' || fileType == 'jpg' || fileType == 'png') {
          event.target.parentElement.querySelector('.upload-btn').src = oFREvent.target.result;
          this.personalInfo.controls.image.setValue(file);
        } else {
          console.error('Invalid file format');
        }
      };
    }
  }

  onClicked() {
    this.toggleoption = !this.toggleoption;
    this.toggleoption2 = false;

  }
  onCobChange() {
    let ch1 = this.personalInfo.controls.checks1.value;
    Object.keys(this._commonservice.lookup).forEach(k => {
      if (this._commonservice.lookup[k].id == ch1)
        ch1 = this._commonservice.lookup[k].name
    })
    this.personalInfo.controls.input1.setValue(ch1)
  }
  onCobChange2() {
    let ch2 = this.personalInfo.controls.checks2.value;
    Object.keys(this._commonservice.lookup).forEach(k => {
      if (this._commonservice.lookup[k].id == ch2)
        ch2 = this._commonservice.lookup[k].name
    })
    this.personalInfo.controls.input2.setValue(ch2)
  }
  onClicked2() {
    this.toggleoption2 = !this.toggleoption2;
    this.toggleoption = false;
  }
  onClicked3(e: string) {
    switch (e) {
      case ("soValue"):
      case ("optionSearch"):
        this.toggleoption = true;
        this.toggleoption2 = false;
        break;
      case ("soValue2"):
      case ("optionSearch2"):
        this.toggleoption = false;
        this.toggleoption2 = true;
        break;
      default:
        this.toggleoption = false;
        this.toggleoption2 = false;
    }

  }
  onSearch(query: string) {
    this.countries = Object.keys(this.countries).filter((country) =>
      this.countries[country].name.common.toLowerCase().includes(query.toLowerCase())
    );
  }

  SignupApiCall() {
    if (!this.personalInfo.valid) {

      return;
    }
    this.loader = true
    const formData = new FormData();
    formData.append('firstName', this.personalInfo.controls.fname.value,)
    formData.append('middleName', this.personalInfo.controls.mname.value,)
    formData.append('lastName', this.personalInfo.controls.lname.value,)
    formData.append('dob', this.personalInfo.controls.date.value,)
    formData.append('genderCD', this.personalInfo.controls.gender.value,)
    formData.append('countryOfBirthCD', this.personalInfo.controls.checks1.value,)
    formData.append('nationality', this.personalInfo.controls.checks2.value,)
    formData.append('profileImage', this.personalInfo.controls.image.value,)
    formData.append("acceptTermsYN", "true")

    this._commonservice.SignUpPersonal(formData, (localStorage.getItem("accessmedium"))).subscribe((resp) => {
      if (resp.body.message.errorMessage == "") {
        this.router.navigate(['/address']);
      }
      else {
        this.loader = false
        this.display = !this.display;
        this.errorMessage = resp.body.message.errorMessage;
      }
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
