import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { debug } from 'util';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn.pipe(take(1), map(
            (loginStatus: boolean) => {
                const destination: string = state.url;
                const itemId = route.params.id;
                // check if user is not logged in
                if (!loginStatus) {
                    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                }

                // if user is already logged in
                switch (destination) {
                    case '/dashboard': {
                        if (localStorage.getItem("userRole") === "User" || localStorage.getItem("userRole") === "Admin") {
                            return true;
                        } else {
                            this.router.navigate(['/access-denied']);
                            return false;
                        }
                    }
                    case '/item': return true;
                    case '/item/' + itemId: {
                        return true;
                    }
                    case '/item/create': {
                        if (localStorage.getItem("userRole") === "User" || localStorage.getItem("userRole") === "Admin") {
                            return true;
                        } else {
                            this.router.navigate(['/access-denied']);
                            return false;
                        }
                    }
                    case '/item/update/' + itemId: {
                        if (localStorage.getItem("userRole") === "User" || localStorage.getItem("userRole") === "Admin") {
                            return true;
                        } else {
                            this.router.navigate(['/access-denied']);
                            return false;
                        }
                    }
                    default: return false;
                }
            }
        ))
    }

}

