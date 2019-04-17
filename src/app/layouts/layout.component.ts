import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../service/user.service';
import { CounterService, CounterInterface } from '../service/counter.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit, OnDestroy {

    private subscriptionActivatedRoute$: Subscription;

    counterPage = false;

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
                response => this.router.navigate(['/login']),
                error => this.router.navigate(['/login'])
            );
    }

    ngOnDestroy(): void {
        this.subscriptionActivatedRoute$.unsubscribe();
    }

}
