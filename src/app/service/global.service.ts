import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { Observable, of } from 'rxjs';

export  interface  ErrorInterface {
    status: any;
    message: string;
}

@Injectable({
    providedIn: 'root'
})

export class GlobalService {

    apiHost: string;

    constructor() {
        if ( environment.production === true ) {
            this.apiHost = 'http://localhost:3000';
        } else {
            this.apiHost = 'http://localhost:3000';
        }
    }

    handleError(error: Response | any): Observable<ErrorInterface> {
        let errorMessage: string;
        if (error.status === 0) {
            errorMessage =  'Извините, произошла ошибка соединения. Пожалуйста, попробуйте еще раз.';
        } else {
            errorMessage = error.error;
        }
        return of( {status: error.status, message: errorMessage} );
    }

}
