import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-security-details',
  templateUrl: './security-details.component.html',
  styleUrls: ['./security-details.component.css']
})
export class SecurityDetailsComponent implements OnInit {
  hide = true;
  hide2 = true;
  securityForm:FormGroup

  constructor(private fb : FormBuilder,private router:Router) { }

  ngOnInit() {
    this.securityForm=this.fb.group({
      ques1:['',Validators.required],
      ans1:['',Validators.required],
      ques2:['',Validators.required],
      ans2:['',Validators.required],
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      flexRadioDefault:['No',Validators.required],
      flexRadioDefault2:['No',Validators.required],
      flexRadioDefault3:['No',Validators.required],
    })
  }
 

  togglePassword(): void {
    this.hide = !this.hide;
  }
  togglePassword2(): void {
    this.hide2 = !this.hide2;
  }
  onSubmit(){
    console.table(this.securityForm.value);
    this.router.navigate(['/review']);
   }
   get ques1(){
    return this.securityForm.get('ques1');
   }
   get ans1(){
    return this.securityForm.get('ans1');
   }
   get ques2(){
    return this.securityForm.get('ques2');
   }
   get ans2(){
    return this.securityForm.get('ans2');
   }
  
   get pass1(){
    return this.securityForm.get('pass1');
   }
   get pass2(){
    return this.securityForm.get('pass2');
   }
  
    
}
