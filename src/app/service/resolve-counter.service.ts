import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CounterService } from './counter.service';

@Injectable({
    providedIn: 'root'
})

export class ResolveCounterService implements Resolve<any> {

    constructor( private counterService: CounterService ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.counterService.getCounterBegin();
    }
}
