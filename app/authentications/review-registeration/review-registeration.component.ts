import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';

@Component({
  selector: 'app-review-registeration',
  templateUrl: './review-registeration.component.html',
  styleUrls: ['./review-registeration.component.css']
})
export class ReviewRegisterationComponent implements OnInit {

  constructor(private router: Router, private _commonservice: CommonService) { }

  ngOnInit() {
  }
  reviewApi() {
    this._commonservice.review(localStorage.getItem("accessmedium")).subscribe((resp) => {
      if (resp.body.message.errorMessage == "")
        this.router.navigate(['/']);

    })
  }


}
