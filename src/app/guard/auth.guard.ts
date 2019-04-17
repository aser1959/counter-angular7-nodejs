import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../service/user.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin( url: string ): boolean {
        if (this.userService.isLoggedIn()) {
            return true;
        }
        this.userService.redirectURL = url;
        this.router.navigate(['/login']);
        return false;
    }
}
