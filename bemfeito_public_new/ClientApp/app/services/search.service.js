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
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environment/environment';
import { BaseService } from "./base.service";
// Add the RxJS Observable operators we need in this app.
import '../utils/rxjs-operators';
let SearchService = class SearchService extends BaseService {
    constructor(http, translate) {
        super();
        this.http = http;
        this.translate = translate;
        this.loggedIn = false;
        this.baseUrl = '';
        this.baseUrl = environment.apiUrl;
        this.currentLanguage = translate.currentLang;
    }
    find(trade, postCode, latitude, longitude, temp) {
        console.log("find func");
        console.log(latitude);
        console.log(longitude);
        console.log(postCode);
        let url = `${environment.apiUrl}/api/trader/public/search/${postCode.toString()}/${latitude.toString()}/${longitude.toString()}/${trade.toString()}`;
        console.log(this.http.get(url, this.buildRequestOptions()).map(res => res.json()).catch(this.handleError));
        return this.http.get(url, this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
        // temp = [
        //     {
        //       "name": "string",
        //       "email": "string",
        //       "telephone": "string",
        //       "website": "string",
        //       "notes": "string",
        //       "userId": 0,
        //       "latitude": 0,
        //       "longitude": 0,
        //       "distance": 0,
        //       "reviewStatisticId": 0,
        //       "lastModifiedUser": "string",
        //       "lastModifiedDate": "2018-06-22T07:10:51.197Z",
        //       "dateCreated": "2018-06-22T07:10:51.197Z",
        //       "id": 0,
        //       "isArchived": true
        //     }
        //   ];
        // return temp;
    }
    // find() {
    //     return [
    //         {
    //           "name": "string",
    //           "email": "string",
    //           "telephone": "string",
    //           "website": "string",
    //           "notes": "string",
    //           "userId": 0,
    //           "latitude": 0,
    //           "longitude": 0,
    //           "distance": 0,
    //           "reviewStatisticId": 0,
    //           "lastModifiedUser": "string",
    //           "lastModifiedDate": "2018-06-22T07:10:51.197Z",
    //           "dateCreated": "2018-06-22T07:10:51.197Z",
    //           "id": 0,
    //           "isArchived": true
    //         }
    //       ];
    // }
    getCategories() {
        return this.http.get(environment.apiUrl + "/api/category/" + this.currentLanguage, this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }
    getMembers() {
        return this.http.get(environment.apiUrl + "/api/trader/dropdown", this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }
    getTraderProfile(traderID) {
        return this.http.get(`${environment.apiUrl}/api/trader/public/${traderID.toString()}`, this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }
};
SearchService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, TranslateService])
], SearchService);
export { SearchService };
//# sourceMappingURL=search.service.js.map