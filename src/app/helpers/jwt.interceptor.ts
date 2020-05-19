import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.isLoggedIn;
        let token = localStorage.getItem('jwt');

        if(currentUser && !isNullOrUndefined(token)) {
            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}

