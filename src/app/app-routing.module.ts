import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { ResolveCounterService } from './service/resolve-counter.service';

import { LoginComponent } from './user/login/login.component';
import { CounterComponent } from './counter/counter.component';

export const routes: Routes = [
            {   path: '', redirectTo: '/counter', pathMatch: 'full'},
            {
                path: 'counter',
                component: CounterComponent,
                canActivate: [ AuthGuard ],
                resolve: { counter: ResolveCounterService }
            },
            {
                path: 'login',
                component: LoginComponent
            },
            { path: '**', redirectTo: '/counter', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
