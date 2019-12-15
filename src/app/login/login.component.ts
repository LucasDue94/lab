import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  authentic() {
    /*const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };*/
    const user = {
      username: 'admin',
      password: 'newsecret'
    };
    console.log(user);
    this.authService.authentication(user).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('error')) {

      } else {
        localStorage.setItem('token', res['token']);
        this.router.navigate(['dashboard']);
      }
    });
  }
}
