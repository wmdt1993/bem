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
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
let ApiRequestsService = class ApiRequestsService {
    constructor(http) {
        this.http = http;
        this.headers = new HttpHeaders();
        this.api = 'http://dev.api.bemfeito.pt/api';
    }
    signUpApplicantTrader(data, endpoint) {
        return this.http.post(this.api + endpoint, data)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    getEstimateAccuracy(endpoint) {
        return this.http.get(this.api + endpoint)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    getCustomerIssue(endpoint) {
        return this.http.get(this.api + endpoint)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    getAllLanguages(endpoint) {
        return this.http.get(this.api + endpoint)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    getCustomerIssueNoMoneyExchanged(endpoint) {
        return this.http.get(this.api + endpoint)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    getCustomerIssueMoneyExchanged(endpoint) {
        return this.http.get(this.api + endpoint)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    getTrader(endpoint) {
        return this.http.get(this.api + endpoint)
            .map(response => {
            return response;
        }, error => {
            alert('invalid');
        });
    }
    addReviewTrader(data, endpoint) {
        // this.headers = this.headers.set('Content-Type', 'application/json');
        // this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        // this.headers = this.headers.set('Accept', 'application/json, text/plain, */*');
        console.log('11');
        console.log(this.headers);
        // return this.http.post(this.api + endpoint,  data, {
        //                           headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        //                       })
        return this.http.post(this.api + endpoint, data, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + 'a8cb7b6d1f4f46ae8a39a789a0de4b6e')
        })
            .map(response => {
            console.log(response);
            return response;
        }, error => {
            alert('invalid');
        });
    }
};
ApiRequestsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], ApiRequestsService);
export { ApiRequestsService };
//# sourceMappingURL=api-requests.service.js.map