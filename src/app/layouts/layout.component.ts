import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { UserService } from '../service/user.service';
import { CounterService, CounterInterface } from '../service/counter.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit, OnDestroy {

    @ViewChild('errorModal') public errorModal:	ModalDirective;

    private subscriptionActivatedRoute$: Subscription;

    counterPage = false;
    errorMessage = '';

    constructor( private router: Router,
                 private activatedRoute: ActivatedRoute,
                 private counterService: CounterService,
                 private userService: UserService ) { }

    ngOnInit() {
        this.subscriptionActivatedRoute$ = this.router.events
            .subscribe( event => {
            if (event instanceof NavigationEnd) {
                this.counterPage =  event.url !== '/login';
            }
        });
    }

    logoutUser(): void {
        this.userService.logout()
            .subscribe(
                response => this.router.navigate( ['/login'] ),
                error => {
                    this.errorMessage = `Не получилось разлогиниться на сервере!
                                         Для обнуления счетчика,
                                         повторите LOGOUT после авторизации!`;
                    this.errorModal.show();
                    setTimeout( () => {
                        this.errorModal.hide();
                        this.errorMessage = '';
                        this.router.navigate( ['/login'] );
                    }, 10000 );
                }
            );
    }

    ngOnDestroy(): void {
        this.subscriptionActivatedRoute$.unsubscribe();
    }

}
