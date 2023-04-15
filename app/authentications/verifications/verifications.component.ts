import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {
  Verification:FormGroup;
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.Verification= this.fb.group({
      verfcode:['xxx',[Validators.required]],
      Refferal:['']
    })
  }
  onSubmit(){
    console.log(this.Verification.value)
    this.router.navigate(['/terms']);
  }

  get verfcode(){
    return this.Verification.get('verfcode');
  }

}
