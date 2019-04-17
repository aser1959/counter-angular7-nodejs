import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService } from './user.service';

@Injectable()

export class InterceptorService  implements HttpInterceptor {

    constructor( private userService: UserService ) { }

    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqCommon = req.clone({
                headers: req.headers.set( 'Content-Type', 'application/json; charset=UTF-8' )
            });

        if ( req.url.endsWith( '/login' ) ) {
            return next.handle(reqCommon);
        } else {
            const  token = this.userService.getAccessToken();
            const  user  = this.userService.getAccessUser();
            let reqEnd = reqCommon.clone({
                    headers:  req.headers.set( 'access_token', token ),
                });
            if ( req.method === 'GET' ) {
                reqEnd = reqEnd.clone({
                    params: req.params.set( 'access_user', user )
                });
            } else {
                reqEnd = reqEnd.clone({
                        body: req.params.set( 'access_user', user )
                    });
            }
            return next.handle(reqEnd);
        }
    }

}
