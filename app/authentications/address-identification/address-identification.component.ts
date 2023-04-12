import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-identification',
  templateUrl: './address-identification.component.html',
  styleUrls: ['./address-identification.component.css']
})
export class AddressIdentificationComponent implements OnInit {
  toggleoption=false
  toggleoption2=false
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
