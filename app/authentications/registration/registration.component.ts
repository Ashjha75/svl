import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  inputForm:FormGroup;
  constructor(private fb: FormBuilder) { }
 


  ngOnInit() {
    this.inputForm=this.fb.group({
      'select':['',[Validators.required]],
      'phone':[' ',[Validators.required,Validators.min(10)]]
    })
   
  }
  onSubmit() {
    console.log(this.inputForm.value);
  }
  get select(){
   return this.inputForm.get('select');
  }
  get phone(){
   return this.inputForm.get('phone');
  }

}
