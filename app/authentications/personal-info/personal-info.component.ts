import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  personalInfo:FormGroup;
  toggleoption=false;
  toggleoption2=false;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.personalInfo=this.fb.group({
      image:['',Validators.required],
      fname:['',Validators.required],
      mname:['',Validators.required],
      lname:['',Validators.required],
      date:['',Validators.required],
      gender:['',Validators.required],
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
  console.table(this.personalInfo.value)
 }
get fname(){
  return this.personalInfo.get('fname');
}
get mname(){
  return this.personalInfo.get('mname');
}
get lname(){
  return this.personalInfo.get('lname');
}
get date(){
  return this.personalInfo.get('date');
}
get gender(){
  return this.personalInfo.get('gender');
}
}
