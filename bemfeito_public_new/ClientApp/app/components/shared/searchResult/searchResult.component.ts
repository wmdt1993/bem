/// <reference path="../../../models/search.trade.interface.ts" />
import { Injectable, Inject, Input, Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { trigger, state, animate, keyframes, transition, style } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { SearchService } from '../../../services/search.service';
import { ISearchTrade } from '../../../models/search.trade.interface';
import { ICategory } from '../../../models/category.interface';
import { ITraderShort } from '../../../models/trader.short.interface';

import { TranslationEmitterService } from '../../../services/translation.emitter.service';

import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { slideInFadeInAnimation } from '../../../animations/slideInFadeIn.animation';

import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import 'rxjs/add/operator/catch';
import { ITraderPreview } from '../../../models/trader.preview.interface';


@Component({
    selector: 'searchResult',
    templateUrl: './searchResult.component.html',
    styleUrls: ['./searchResult.component.css'],
    animations: [
        trigger(
            'moveLabel', [
                state('moveUp', style({
                    opacity: 0.75,
                    top: '4px',
                    fontSize: '14px'
                })),
                state('moveDown', style({
                    opacity: 1.0,
                    top: '20px',
                    fontSize: '14px'

                })),
                transition('* => moveUp', animate('400ms ease-in-out')),
                transition('* => moveDown', animate('400ms ease-in-out'))
            ]),
        fadeInAnimation,
        slideInFadeInAnimation
    ],
    providers: [SearchService]
})
export class SearchResultComponent {
    
    filteredTraders: ITraderPreview[];
    traderSubscription: Subscription;

    trade: number;
    latitude: number;
    longitude: number;
    postCode: any;
    // locality: any;
    temp: any;
    tempResults: any;
    // selectedCategory: any;
    locationText: any;
    locality: any = localStorage.getItem('locality');
    selectedCategory: any = localStorage.getItem('selectedCategory');

    title: string = 'My first AGM project';
    lat: number = 51.678418;
    lng: number = 7.809007;
    lat2: number = 52.678418;
    lng2: number = 8.809007;

    // localStorage.setItem('latitude');
    // localStorage.setItem('longitude');


    // localStorage.setItem('trade', this.trade.toString());
    load = false;

    
    constructor(
        private router: Router,
        private service: SearchService,
        private translationService: TranslationEmitterService,
        private http: Http,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {

        this.trade = +localStorage.getItem('trade');
        this.latitude = +localStorage.getItem('latitude');
        this.longitude = +localStorage.getItem('longitude');
        this.postCode = +localStorage.getItem('postCode');
        // this.locality = +localStorage.getItem('locality');
        this.temp = '';
        this.tempResults;
        //this.selectedCategory = +localStorage.getItem('selectedCategory');
        this.locationText = +localStorage.getItem('locationText');

    }



    ngOnInit() {
        setTimeout(() => this.load = true, 3000);

        console.log(this.postCode);
        this.traderSubscription = this.service.find(
                                    this.trade, 
                                    this.postCode,
                                    this.latitude, 
                                    this.longitude, 
                                    this.temp
                                  ).subscribe((traders: ITraderPreview[]) => {

            // this.filteredTraders = traders;
            this.filteredTraders = traders;
            console.log("loaded traders in search result aaa");
            console.log(traders);
        })
    }

    ngAfterViewInit() {
       
    }

    ngOnDestroy() {
       
    }

    // openTraderProfile(traderId) {
    //     this._router.navigate(['traderProfile']);
    // }
    
}
