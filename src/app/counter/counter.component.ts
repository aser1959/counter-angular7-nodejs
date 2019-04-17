import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable} from 'rxjs';

import { CounterService, CounterInterface } from '../service/counter.service';
import { UserService } from '../service/user.service';
import { ErrorInterface } from '../service/global.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})

export class CounterComponent implements OnInit {

    @ViewChild('counterModal') public counterModal:	ModalDirective;
    @ViewChild('errorModal')   public errorModal:	ModalDirective;

    counter = 0;
    counterName = 'Count';
    confirmCounter = 0;
    errorMessage = '';
    errorMessageOnInit = '';

    constructor( private counterService: CounterService,
                 private userService: UserService,
                 private router: Router,
                 private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.data
            .subscribe(
                (data: any ) => {
                if ( data.counter.value && data.counter.value.message ) {
                    this.errorProcessing( data.counter.value.message, data.counter.value.status, true);
                } else {
                    this.counter = data.counter.counter;
                    this.counterName = this.counter ? 'Counter' : 'Count';
                }
            }
        );
    }

    getCounter(): void {
        return this.counterService.getCounterBegin()
            .subscribe(
                ( response: CounterInterface ) => this.counter = response.counter,
                error => this.errorProcessing( error.value.message, error.value.status )
            );
    }

    chengeCounter( incrementDecrement: string ): any {
        return this.counterService.setChengeCounter( incrementDecrement )
            .then(
                response => {
                    if ( incrementDecrement === 'increment' ) {
                        this.confirmCounter = response.counter;
                        return true;
                    }
                },
                error =>
                    this.errorProcessing( error.value.message, error.value.status )
                );
    }

    private errorProcessing( message: string, status: number , onInit: boolean = false ): void {
        if (!onInit) {
            this.errorMessage = message;
            this.errorModal.show();
        } else {
            this.errorMessageOnInit = message;
        }
        setTimeout( () => {
            if ( !onInit ) {
                this.errorModal.hide();
            }
            this.errorMessage = '';
            this.errorMessageOnInit = '';
            if (status === 401) {
                this.router.navigate( [ '/login' ] );
            }
        }, 5000 );
    }

    private counterModalHide(): void {
        this.counterModal.hide();
    }

    async counterModalShow() {
        const result = await this.chengeCounter('increment');
        if ( result ) {
            this.counterModal.show();
        }
    }

    okCounter(): void {
        this.counterName = 'Counter';
        this.counterModalHide();
        this.counter = this.confirmCounter;
    }

    noCounter(): void {
        this.chengeCounter('decrement');
        this.counterModalHide();
    }
}
