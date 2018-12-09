var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environment/environment';
import { BaseService } from "./base.service";
import { BehaviorSubject } from 'rxjs/Rx';
// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
let UserService = class UserService extends BaseService {
    constructor(http) {
        super();
        this.http = http;
        this.baseUrl = '';
        // Observable navItem source
        this._authNavStatusSource = new BehaviorSubject(false);
        // Observable navItem stream
        this.authNavStatus$ = this._authNavStatusSource.asObservable();
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
        this.baseUrl = environment.apiUrl;
    }
    register(email, password, firstName, lastName, location) {
        let body = JSON.stringify({ email, password, firstName, lastName, location });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "/accounts", body, options)
            .map(res => true)
            .catch(this.handleError);
    }
    login(userName, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.baseUrl + '/auth/login', JSON.stringify({ userName, password }), { headers })
            .map(res => res.json())
            .map(res => {
            localStorage.setItem('auth_token', res.auth_token);
            this.loggedIn = true;
            this._authNavStatusSource.next(true);
            return true;
        })
            .catch(this.handleError);
    }
    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }
    isLoggedIn() {
        return this.loggedIn;
    }
    facebookLogin(accessToken) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = JSON.stringify({ accessToken });
        return this.http
            .post(this.baseUrl + '/externalauth/facebook', body, { headers })
            .map(res => res.json())
            .map(res => {
            localStorage.setItem('auth_token', res.auth_token);
            this.loggedIn = true;
            this._authNavStatusSource.next(true);
            return true;
        })
            .catch(this.handleError);
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map