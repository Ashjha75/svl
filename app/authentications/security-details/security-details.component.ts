import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-details',
  templateUrl: './security-details.component.html',
  styleUrls: ['./security-details.component.css']
})
export class SecurityDetailsComponent implements OnInit {
  hide = true;
  hide2 = true;
  
  constructor() { }

  ngOnInit() {
  }
 

  togglePassword(): void {
    this.hide = !this.hide;
  }
  togglePassword2(): void {
    this.hide2 = !this.hide2;
  }

 
    
}
