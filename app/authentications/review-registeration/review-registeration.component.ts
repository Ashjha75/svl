import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';

@Component({
  selector: 'app-review-registeration',
  templateUrl: './review-registeration.component.html',
  styleUrls: ['./review-registeration.component.css']
})
export class ReviewRegisterationComponent implements OnInit {
  securityDetails = [];
  personalinfo = this._commonservice.personalInfo;
  addressInfo = this._commonservice.addressInfo;
  identificationDetails = this._commonservice.identificationDetails;
  personalinfoContiner = []
  imageUrl: string;
  documentUrl: string;
  documentBackUrl: string;
  sourceUrl: string;
  addressProofUrl: string;
  display = this.identificationDetails["optForCashRecharge"]
  tiervalue = this.identificationDetails["tier"];
  optYN = "No";
  firstlayer: boolean;
  secondLayer: boolean;
  thirdLayer: boolean;
  constructor(private router: Router, private _commonservice: CommonService) { }

  ngOnInit() {
    Object.keys(this._commonservice.securityQuestions).forEach(res => {
      if (this._commonservice.securityQuestions[res].id == this._commonservice.securityContainers[1].questionCD) {
        this.securityDetails.push(this._commonservice.securityQuestions[res].name)
        this.securityDetails.push(this._commonservice.securityContainers[1].answer)
      }
      if (this._commonservice.securityQuestions[res].id == this._commonservice.securityContainers[0].questionCD) {
        this.securityDetails.push(this._commonservice.securityQuestions[res].name)
        this.securityDetails.push(this._commonservice.securityContainers[0].answer)
      }
    })

    if (this._commonservice.personalInfo["genderCD"] == "M") {
      this.personalinfoContiner.push("Male")
    }
    else {
      this.personalinfoContiner.push("Female")
    }
    Object.keys(this._commonservice.lookup).forEach(k => {
      if (this._commonservice.lookup[k].id == this._commonservice.personalInfo["countryOfBirthCD"])
        this.personalinfoContiner.push(this._commonservice.lookup[k].name)
      if (this._commonservice.lookup[k].id == this._commonservice.personalInfo["nationality"])
        this.personalinfoContiner.push(this._commonservice.lookup[k].name)
    })

    this.imageUrl = this.personalinfo["profileImage"]
    this.documentUrl = this.identificationDetails["document"]
    this.documentBackUrl = this.identificationDetails["documentBack"]
    this.sourceUrl = this.identificationDetails["sourceOfFund"]
    this.addressProofUrl = this.identificationDetails["addressProof"]
    if (this.display == "true" || this.display == true)
      this.optYN = "Yes"

    switch (this.tiervalue) {
      case ("1"):
        this.firstlayer = false;
        this.secondLayer = false;
        this.thirdLayer = false;
        break;
      case ("2"):
        this.firstlayer = true;
        this.secondLayer = false;
        this.thirdLayer = false;
        break;
      case ("3"):
        this.firstlayer = true;
        this.secondLayer = true;
        this.thirdLayer = false;
        break;
      case ("4"):
        this.firstlayer = true;
        this.secondLayer = true;
        this.thirdLayer = true;
        break;
      default:
        this.firstlayer = false;
        this.secondLayer = false;
        this.thirdLayer = false;
    }

  }
  reviewApi() {
    this._commonservice.review(localStorage.getItem("accessmedium")).subscribe((resp) => {
      if (resp.body.message.errorMessage == "")
        this.router.navigate(['/']);

    })
  }


}
