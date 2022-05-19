import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      repass: ['', Validators.required],
      mobile: ['', [Validators.required]],
      date: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }
  userentry() {
    if (this.signupForm.valid) {
      this.http.post("http://localhost:3000/api/signup", { data: this.signupForm.value })
        .subscribe((response) => {
          console.log(response['data'], 4000, "green")
          if (response['data'] != 'user already exist') {
            this.signupForm.reset();
            // this.event.emit(this.login);
          }
        });
    } else {
      console.log('form details Invalid', 4000, "red")

    }
  }

}
