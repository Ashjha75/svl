import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  
  toggleoption=false;
  toggleoption2=false;
  constructor() { }

  ngOnInit() {
  }

 onClicked(){
  this.toggleoption=!this.toggleoption;
  this.toggleoption2=false;
 }
 onClicked2(){
  this.toggleoption2=!this.toggleoption2;
  this.toggleoption=false;
 }

}
