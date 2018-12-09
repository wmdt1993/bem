import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { ISearchTrade } from '../models/search.trade.interface';
import { ICategory } from '../models/category.interface';
import { environment } from '../environment/environment';

import { BaseService } from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import '../utils/rxjs-operators';
import { ITraderShort } from '../models/trader.short.interface';
import { ITraderPreview } from '../models/trader.preview.interface';
import { ITraderDropDown } from '../models/trader.dropdown.interface';
import { ITraderProfile } from '../models/trader.profile.interface';

@Injectable()

export class SearchService extends BaseService {

    private loggedIn = false;

    private baseUrl: string = '';
    private currentLanguage: string;

    constructor(private http: Http, private translate: TranslateService) {
        super();

        this.baseUrl = environment.apiUrl;
        this.currentLanguage = translate.currentLang;
    }

    find(trade: number, postCode: any, latitude: number, longitude: number, temp: any): Observable<ITraderPreview[]> {
        console.log("find func");
        console.log(latitude);
        console.log(longitude);
        console.log(postCode);
        let url: string = `${environment.apiUrl}/api/trader/public/search/${postCode.toString()}/${latitude.toString()}/${longitude.toString()}/${trade.toString()}`;

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

    getCategories(): Observable<ICategory[]> {
        
        return this.http.get(environment.apiUrl + "/api/category/" + this.currentLanguage, this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }

    getMembers(): Observable<ITraderDropDown[]> {

        return this.http.get(environment.apiUrl + "/api/trader/dropdown", this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }

    getTraderProfile(traderID: number): Observable<ITraderProfile[]> {
        return this.http.get(`${environment.apiUrl}/api/trader/public/${traderID.toString()}`, this.buildRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    }

}

