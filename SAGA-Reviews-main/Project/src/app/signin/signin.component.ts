import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: any = {};
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      pass: ['', Validators.required],

    });
  }

  result() {
    if (this.loginForm.valid) {
      this.http.post("http://localhost:3000/api/login", { data: this.loginForm.value })
        .subscribe((response) => {
          localStorage.setItem("token", response['token']);
          if (response['data'] === "") {
            console.log('Wrong Credentials !', 4000, "red")
          } else {
            console.log('Login Successfull !', 4000, "green")
            this.user = response['data'];
            this.user.isLoggedIn = true;
            console.log(this.user);
            
            // this.userDetailService.setUserDetails(response['data']);
            localStorage.setItem("userpass", JSON.stringify(response['data']));
            window.location.reload();
          }
        });
    } else {
      console.log('wrong Credentials !', 4000, "red")
    }
  }

  ngOnInit(): void {
  }

}
