import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {
  Verification:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.Verification= this.fb.group({
      verfcode:['xxx',[Validators.required]],
      Refferal:['']
    })
  }
  onSubmit(){
    console.log(this.Verification.value)
  }

  get verfcode(){
    return this.Verification.get('verfcode');
  }

}
