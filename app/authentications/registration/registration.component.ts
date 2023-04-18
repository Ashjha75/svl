import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  inputForm: FormGroup;
  body = {};
  headers;
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService) { }



  ngOnInit() {
    this.inputForm = this.fb.group({
      'select': ['', Validators.required],
      'phone': ['', Validators.required]
    })
  }
  registerApi() {
    this.body = {
      'phone': this.inputForm.controls.select.value + this.inputForm.controls.phone.value
    };
    localStorage.setItem('accesmedium', "eyJpdiI6Iko2Rmp2VkwwcVJaZUN1RmtIYnlUTmc9PSIsInZhbHVlIjoiTVl4ZlV2QVg3SDJ4VENWL1NJanVHaEJPbXQ4MVo4RE9UY2ZuZi9pcmNjVWVVRlNwMjJTU041M2ZzeU5rMEh0MFpydDluOGt0bTJNaDhYaHVxZ0hwQ0NiQjBLOHZ6ZXFyUHgzNWhyckVSZG1WMm5waFZac0k4WWtPNVR4TUdxN0RRVlZGYzd0TlJSeEh0YWN6TjZmM2lSTThKRTE2Qmh3aEFZc095K2hHQy9KVWxJY0hhTjlpTzJmZUtNRmxQSVgydm9JWGFuMFgrUXMvY1QyNnJNaUNEWU9WWGR1STh5MXhkcGpYMEYxMjM3bFBZMmNqOW5ySWRxeE4rc0h4OXNrRGVNSHdsQUs2NEtHMkRVV2lKako4ckluT2RMTmV2aHpQZGN3WXJSRVhkOEk9IiwibWFjIjoiYWY1ZmJiZDdlYzUzNzg5NDZiZjkwMTU3M2U1NzRmMWY4NDQ0ZjFiNTc4YWFmMjQ1MTIyNjJhNTliYjBjMzBjZCJ9");

    this.commonService.register(this.body).subscribe((res: HttpResponse<any>) => {
      if (this.inputForm.valid) {
        this.router.navigate(['/verifications'])
      }

      console.log(res.headers);
      return res;
      // debugger
      // localStorage.setItem('accesmedium', "eyJpdiI6Iko2Rmp2VkwwcVJaZUN1RmtIYnlUTmc9PSIsInZhbHVlIjoiTVl4ZlV2QVg3SDJ4VENWL1NJanVHaEJPbXQ4MVo4RE9UY2ZuZi9pcmNjVWVVRlNwMjJTU041M2ZzeU5rMEh0MFpydDluOGt0bTJNaDhYaHVxZ0hwQ0NiQjBLOHZ6ZXFyUHgzNWhyckVSZG1WMm5waFZac0k4WWtPNVR4TUdxN0RRVlZGYzd0TlJSeEh0YWN6TjZmM2lSTThKRTE2Qmh3aEFZc095K2hHQy9KVWxJY0hhTjlpTzJmZUtNRmxQSVgydm9JWGFuMFgrUXMvY1QyNnJNaUNEWU9WWGR1STh5MXhkcGpYMEYxMjM3bFBZMmNqOW5ySWRxeE4rc0h4OXNrRGVNSHdsQUs2NEtHMkRVV2lKako4ckluT2RMTmV2aHpQZGN3WXJSRVhkOEk9IiwibWFjIjoiYWY1ZmJiZDdlYzUzNzg5NDZiZjkwMTU3M2U1NzRmMWY4NDQ0ZjFiNTc4YWFmMjQ1MTIyNjJhNTliYjBjMzBjZCJ9");
    });

  }


  get select() {
    return this.inputForm.get('select');
  }
  get phone() {
    return this.inputForm.get('phone');
  }

}
