import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    private formErrors: any;
    private isSubmitted = false;
    private errorMessage = '';

    constructor( private userService: UserService,
                 private router: Router,
                 private formBuilder: FormBuilder ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [ '', Validators.required ],
            password: [ '', Validators.required ],
        });
    }

    get formControls() { return this.loginForm.controls; }

    onSubmit() {
        this.isSubmitted = true;
        this.userService.login( this.loginForm.value.username, this.loginForm.value.password )
            .subscribe(
                result => {
                    this.router.navigate( [this.userService.redirectURL] );
                },
                error => {
                    this.isSubmitted = false;
                    this.errorMessage = error.value.message;
                }
            );
    }

    formFocus(): void {
        this.errorMessage = '';
    }
}
