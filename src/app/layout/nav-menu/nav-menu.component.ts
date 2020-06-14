import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;
  userNameNormal: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username$ = this.authService.currentUserName;
  }

  onLogout() {
    this.authService.logout();
  }

}
