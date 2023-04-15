import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  inputForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.inputForm = this.fb.group({
      'select': ['', Validators.required],
      'phone': ['', Validators.required]
    })

  }
  onSubmit() {

    console.log(this.inputForm.value);
    if (this.inputForm.valid) {
      this.router.navigate(['/verifications'])
    }
  }
  get select() {
    return this.inputForm.get('select');
  }
  get phone() {
    return this.inputForm.get('phone');
  }

}
