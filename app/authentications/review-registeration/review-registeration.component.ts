import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-registeration',
  templateUrl: './review-registeration.component.html',
  styleUrls: ['./review-registeration.component.css']
})
export class ReviewRegisterationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onClick(){
    this.router.navigate(['/']);
  }

}
