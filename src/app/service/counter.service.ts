import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

import { GlobalService, ErrorInterface } from './global.service';

export  interface  CounterInterface {
    counter: number;
}

@Injectable({
    providedIn: 'root'
})

export class CounterService {

    constructor( private http: HttpClient, private globalService: GlobalService, private router: Router) {}

    getCounterBegin(): Observable<CounterInterface> | any {
        return this.http.get( `${this.globalService.apiHost}/begin` )
                .pipe(
                    response =>  response,
                    catchError(	(error: any ) => of( this.globalService.handleError( error ) )
                ));
    }

    setChengeCounter(incrementDecrement): Promise<CounterInterface> | any {
        return this.http.put(`${this.globalService.apiHost}/${incrementDecrement}`, {} )
            .toPromise()
            .then(
                (response: CounterInterface) => response,
                ( error: ErrorInterface ) =>
                    throwError( this.globalService.handleError( error ) ).toPromise()
            );
    }
}
