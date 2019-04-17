import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError , of } from 'rxjs';

import { GlobalService } from './global.service';

@Injectable({
 providedIn: 'root'
})

export class UserService {

    private loggedIn = false;

    redirectURL = '';

    constructor( private http: HttpClient,
                 private globalService: GlobalService,
                 private router: Router) {

        this.loggedIn = this.checkAccessToken();
    }

    login( username, password ): Observable<any> {
        return this.http.post( `${this.globalService.apiHost}/login`, { username, password } )
            .pipe(
                map(( response: any ) => {
                    localStorage.setItem( 'access_token', response.access_token );
                    localStorage.setItem( 'access_user', response.access_user );
                    this.loggedIn = true;
                }),
                catchError(	error =>
                   throwError( this.globalService.handleError(error) )
                )
            );
    }

    logout(): Observable<any> {
        return this.http.post(`${this.globalService.apiHost}/logout`, {})
            .pipe(
                map(( esponse: any ) => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('access_user');
                    this.loggedIn = false;
                }),
                catchError(	error =>
                    throwError(this.globalService.handleError(error))
                )
            );
    }

    getAccessToken(): string {
        return localStorage.getItem('access_token');
    }

    getAccessUser(): string {
        return localStorage.getItem('access_user');
    }

    isLoggedIn(): boolean {
        this.loggedIn = this.checkAccessToken();
        return this.loggedIn;
    }

    private checkAccessToken(): boolean {
        return !!localStorage.getItem('access_token');
    }

}
