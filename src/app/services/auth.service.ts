import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/account/login.model';
import { environment } from 'src/environments/environment';
import { shareReplay, tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../models/account/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.ApiUrl;
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(localStorage.getItem('userName'));
  private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient,
    private router: Router) { }

  login(user: Login) {
    return this.http.post<any>(`${this.baseUrl}/Account/Login`, user).pipe(
      map(result => {
        if(result && result.token) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('expiration', result.expiration);
          localStorage.setItem('userRole', result.userRole);
          this.userName.next(localStorage.getItem('username'));
          this.userRole.next(localStorage.getItem('userRole'));
        }
        return result;
      })
    );
  };

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged out successfully");
  }

  register(user: Register) {
    return this.http.post<any>(`${this.baseUrl}/Account/Register`, user).pipe(
      map(
        result => {
          console.log("registration was successful");
          return result;
        },
        error => error
      )
    );
  };

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem("loginStatus");
    if(loginCookie == "1"){
      return true;
    }
    return false;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.userName.asObservable();
  }

  get currentUserRole() {
    return this.userRole.asObservable();
  }

}
