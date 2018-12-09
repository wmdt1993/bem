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
import { Input, Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import { SearchService } from '../../../services/search.service';
import { TranslationEmitterService } from '../../../services/translation.emitter.service';
import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { slideInFadeInAnimation } from '../../../animations/slideInFadeIn.animation';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/catch';
import { Globals } from '../../../globals/globals';
let SearchTradeComponent = class SearchTradeComponent {
    constructor(globals, router, service, translationService, http, mapsAPILoader, ngZone) {
        this.globals = globals;
        this.router = router;
        this.service = service;
        this.translationService = translationService;
        this.http = http;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.pageNumber = 1;
        this.searchTrade = false;
        this.toHighlight = '';
        this.latitude = -1;
        this.longitude = -1;
        this.trade = -1;
        this.member = -1;
        this.populateOnInit = false;
        this.tradeCtrl = new FormControl();
        this.locationCtrl = new FormControl();
        this.memberCtrl = new FormControl();
        this.translationSubscription = this.translationService.languageChange$.subscribe(lang => {
            console.log("triggering");
            this.refreshAutoCompleteItems(lang);
        });
    }
    ngOnInit() {
        this.categorySubscription = this.service.getCategories().subscribe((categories) => {
            this.categoryOptions = categories;
            this.filteredCategoryOptions = this.tradeCtrl.valueChanges
                .pipe(startWith(''), map(options => options ? this.categoryFilter(options) : this.categoryOptions.slice()));
            if (this.populateOnInit) {
                let category = +localStorage.getItem('trade');
                if (category > 0) {
                    let toSelect = categories.find(c => c.id === category); // Parse to Number if not a string
                    this.tradeCtrl.setValue(toSelect.name);
                }
            }
        });
        this.memberSubscription = this.service.getMembers().subscribe((members) => {
            this.memberOptions = members;
            this.filteredMemberOptions = this.memberCtrl.valueChanges
                .pipe(startWith(''), map(options => options ? this.memberFilter(options) : this.memberOptions.slice()));
            if (this.populateOnInit) {
                let member = +localStorage.getItem('member');
                if (member > 0) {
                    let toSelect = members.find(c => c.id === member); // Parse to Number if not a string
                    this.tradeCtrl.setValue(toSelect.name);
                }
            }
        });
        console.log("LOAD");
        console.log(this.mapsAPILoader);
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"],
                componentRestrictions: { country: "pt" }
            });
            console.log("PLACESSS");
            console.log(this.autocomplete);
            this.autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place = this.autocomplete.getPlace();
                    console.log(place);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        this.locationCtrl.setValue("");
                        return;
                    }
                    console.log("SET UP LOCATION ----");
                    console.log("LAT LONG");
                    console.log(place.geometry.location.lat());
                    console.log(place.geometry.location.lng());
                    //set latitude, longitude
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.postCode = JSON.stringify(place.address_components[5]['long_name']);
                    this.locality = JSON.stringify(place.address_components[2]['long_name']);
                    this.pl = JSON.stringify(place.address_components[5]);
                    this.locationCtrl.setValue(place.formatted_address.toString());
                });
            });
            //google.maps.event.addDomListener(this.locationCtrl, "onFocusOut", () => {
            //    this.ngZone.run(() => {
            //        //when user leaves the textbox
            //        //get the first result form the prediction list
            //        //set the locationCtrl.setValue to be this text
            //        //then geolocate and set latitude and longitude values
            //        console.log("in the out of focus event");
            //        let prediction: google.maps.places.PlaceResult = this.autocomplete.getPlace();
            //        this.latitude = prediction.geometry.location.lat();
            //        this.longitude = prediction.geometry.location.lng();
            //        this.locationCtrl.setValue(prediction.formatted_address.toString());
            //        console.log("in the focus out event");
            //    });
            //});
            if (this.populateOnInit) {
                let locationText = localStorage.getItem('locationText');
                this.locationCtrl.setValue(locationText);
            }
        });
    }
    ngAfterViewInit() {
        this.trigger.panelClosingActions
            .subscribe(e => {
            if (!(e && e.source)) {
                this.tradeCtrl.setValue(null);
                this.trade = -1;
                this.toHighlight = '';
                this.trigger.closePanel();
            }
        });
    }
    ngOnDestroy() {
        this.categorySubscription.unsubscribe();
        this.memberSubscription.unsubscribe();
        this.translationSubscription.unsubscribe();
    }
    onLocationFocusOut() {
        console.log("Focus out called");
        console.log(this.autocomplete.getPlace());
        var service = new google.maps.places.AutocompleteService();
        console.log("logging the input ctrl");
        console.log(this.locationCtrl);
        var options = {
            input: this.locationCtrl.value,
            types: ['address'],
            componentRestrictions: { country: 'pt' }
        };
        service.getPlacePredictions(options, this.selectPrediction);
    }
    selectPrediction(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log(status);
            return;
        }
        console.log(predictions);
        console.log(predictions.length);
        if (predictions.length > 0) {
            console.log("setting the value:");
            // console.log(this.locationCtrl);
            this.locationCtrl.setValue(predictions[0].description.toString());
        }
        else {
            this.locationCtrl.markAsDirty();
            this.locationCtrl.setValue("");
        }
    }
    ///KEPT FOR RESULTS PAGE JUST HOOLDING IT HERE
    setCenter(e) {
        e.preventDefault();
        //this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    }
    refreshAutoCompleteItems(lang) {
        console.log("in subscription " + lang);
    }
    categoryFilter(val) {
        this.toHighlight = val;
        return this.categoryOptions.filter(x => 
        // x.name.toUpperCase().indexOf(val.toUpperCase()) !== -1
        x.name);
    }
    memberFilter(val) {
        this.toHighlight = val;
        return this.memberOptions.filter(x => x.name.toUpperCase().indexOf(val.toUpperCase()) !== -1);
    }
    onTradeSelected(event, selected) {
        if (event.isUserInput) {
            this.trade = selected.id;
            this.selectedCategory = selected;
        }
    }
    searchTradeSubmit() {
        console.log("in the form submit");
        let error = false;
        console.log("trade :" + this.trade);
        console.log(this.trade == -1);
        if (this.trade == -1) {
            console.log("marking trade as dirty");
            this.tradeCtrl.markAsDirty();
            error = true;
        }
        console.log("HUUUUUUU");
        console.log("lat :" + this.latitude);
        console.log("long :" + this.longitude);
        console.log("place :" + this.pl);
        console.log("postal code :" + this.postCode);
        console.log("locality locality :" + this.locality);
        if (this.latitude == -1 || this.longitude == -1) {
            console.log("marking address input as dirty");
            this.locationCtrl.markAsDirty();
            error = true;
        }
        if (!error) {
            console.log('selected category');
            console.dir(this.selectedCategory);
            console.dir(this.selectedCategory.translations);
            console.dir(this.selectedCategory.translations[0]);
            console.dir(this.selectedCategory.translations[0]['name']);
            localStorage.setItem('selectedCategory', this.selectedCategory.translations[0]['name'].toString());
            localStorage.setItem('trade', this.trade.toString());
            localStorage.setItem('latitude', this.latitude.toString());
            localStorage.setItem('longitude', this.longitude.toString());
            localStorage.setItem('postCode', this.postCode.toString());
            localStorage.setItem('locality', this.locality.toString());
            localStorage.setItem('locationText', this.locationCtrl.value);
            this.router.navigate(['/search']);
        }
    }
    searchMemberSubmit() {
        console.log("search by member");
        let error = false;
        if (this.member == -1) {
            this.memberCtrl.markAsDirty();
            error = true;
        }
        console.log("outside if error");
        // if (!error) {
        console.log("inside if error");
        localStorage.setItem('member', this.member.toString());
        this.router.navigate(['/traderProfile/', this.trade]);
    }
};
__decorate([
    ViewChild("search"),
    __metadata("design:type", ElementRef)
], SearchTradeComponent.prototype, "searchElementRef", void 0);
__decorate([
    ViewChild(MatAutocompleteTrigger),
    __metadata("design:type", Object)
], SearchTradeComponent.prototype, "trigger", void 0);
__decorate([
    Input("PopulateOnInit"),
    __metadata("design:type", Boolean)
], SearchTradeComponent.prototype, "populateOnInit", void 0);
SearchTradeComponent = __decorate([
    Component({
        selector: 'searchTrade',
        templateUrl: './searchTrade.component.html',
        styleUrls: ['./searchTrade.component.css'],
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
        providers: [SearchService, Globals]
    }),
    __metadata("design:paramtypes", [Globals,
        Router,
        SearchService,
        TranslationEmitterService,
        Http,
        MapsAPILoader,
        NgZone])
], SearchTradeComponent);
export { SearchTradeComponent };
//# sourceMappingURL=searchTrade.component.js.map