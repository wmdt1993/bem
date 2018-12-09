var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/search.trade.interface.ts" />
import { Component, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { SearchService } from '../../../services/search.service';
import { TranslationEmitterService } from '../../../services/translation.emitter.service';
import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { slideInFadeInAnimation } from '../../../animations/slideInFadeIn.animation';
import 'rxjs/add/operator/catch';
let SearchResultComponent = class SearchResultComponent {
    constructor(router, service, translationService, http, mapsAPILoader, ngZone) {
        this.router = router;
        this.service = service;
        this.translationService = translationService;
        this.http = http;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.locality = localStorage.getItem('locality');
        this.selectedCategory = localStorage.getItem('selectedCategory');
        this.title = 'My first AGM project';
        this.lat = 51.678418;
        this.lng = 7.809007;
        this.lat2 = 52.678418;
        this.lng2 = 8.809007;
        // localStorage.setItem('latitude');
        // localStorage.setItem('longitude');
        // localStorage.setItem('trade', this.trade.toString());
        this.load = false;
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
        this.traderSubscription = this.service.find(this.trade, this.postCode, this.latitude, this.longitude, this.temp).subscribe((traders) => {
            // this.filteredTraders = traders;
            this.filteredTraders = traders;
            console.log("loaded traders in search result aaa");
            console.log(traders);
        });
    }
    ngAfterViewInit() {
    }
    ngOnDestroy() {
    }
};
SearchResultComponent = __decorate([
    Component({
        selector: 'searchResult',
        templateUrl: './searchResult.component.html',
        styleUrls: ['./searchResult.component.css'],
        animations: [
            trigger('moveLabel', [
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
    }),
    __metadata("design:paramtypes", [Router,
        SearchService,
        TranslationEmitterService,
        Http,
        MapsAPILoader,
        NgZone])
], SearchResultComponent);
export { SearchResultComponent };
//# sourceMappingURL=searchResult.component.js.map