import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepting')
        let token = localStorage.getItem('token') as string;
        if (token) {
            // const isLoggedIn = true;
            const isApiUrl = request.url.startsWith('http://localhost:5491');
            if(isApiUrl) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${token}` }
                });
            }
        }

        return next.handle(request);
    }
}