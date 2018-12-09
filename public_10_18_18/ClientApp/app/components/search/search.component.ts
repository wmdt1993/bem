import { Injectable, Inject, Component } from '@angular/core';

import { ITraderShort } from '../../models/trader.short.interface';

import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Globals } from '../../globals/globals';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    // title: string = 'My first AGM project';
    lat: any;
    lng: any;
    // lat2: number = 52.678418;
    // lng2: number = 8.809007;

    load = false;

    trade = +localStorage.getItem('trade');
    latitude = +localStorage.getItem('latitude');
    longitude = +localStorage.getItem('longitude');
    postCode = +localStorage.getItem('postCode');




    results: ITraderShort[];

    subscription: Subscription;


    satellite: any;
    stylesmap: any;
    

    constructor(
        private globals: Globals,
    ) {
       
    }


    ngOnInit() {
        console.log("SEARCH loaded traders in search result aaa");
        this.stylesmap = this.globals.stylesmap;
        console.log("GLOBALLLL");
        console.log(this.stylesmap);
        this.satellite = "hybrid";
              console.log(this.trade);
        console.log(this.latitude);
        this.lat = this.latitude;
        console.log(this.longitude);
        this.lng = this.longitude;
        console.log(this.postCode);
    }

}
