import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from 'src/app/models/account/login.model';
import { debug } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  errorMessage: string;
  invalidLogin: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    let userLogin: Login = this.loginForm.value;
    this.authService.login(userLogin).subscribe(
      result => {
        let token = (<any>result).token;
        console.log("User logged in succesfully");
        this.invalidLogin = false;
        debugger;
        this.router.navigate([`${this.returnUrl}`]);
      },
      error => {
        this.invalidLogin = true;
        this.errorMessage = error.error.loginError;
        console.log(this.errorMessage);
      }
    )
  }

}
