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
import { ITraderDropDown } from '../../../models/trader.dropdown.interface';

import { TranslationEmitterService } from '../../../services/translation.emitter.service';

import { fadeInAnimation } from '../../../animations/fadeIn.animation';
import { slideInFadeInAnimation } from '../../../animations/slideInFadeIn.animation';

import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import 'rxjs/add/operator/catch';

import { Globals } from '../../../globals/globals';

@Component({
    selector: 'searchTrade',
    templateUrl: './searchTrade.component.html',
    styleUrls: ['./searchTrade.component.css'],
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
    providers: [SearchService, Globals]
})
export class SearchTradeComponent {
    pageNumber = 1;
    filteredCategoryOptions: Observable<ICategory[]>;
    filteredMemberOptions: Observable<ITraderDropDown[]>;
    categoryOptions: ICategory[];
    memberOptions: ITraderDropDown[];

    categorySubscription: Subscription;
    memberSubscription: Subscription;
    translationSubscription: Subscription;

    selectedCategory: any;

    public tradeCtrl: FormControl;
    public locationCtrl: FormControl;

    public memberCtrl: FormControl;

    public searchTrade = false;

    toHighlight: string = '';

    public autocomplete: google.maps.places.Autocomplete;

    public latitude: number = -1;
    public longitude: number = -1;
    public postCode: any;
    public locality: any;
    public pl: any;
    public trade: number = -1;

    public member: number = -1;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    @ViewChild(MatAutocompleteTrigger) trigger;

    @Input("PopulateOnInit") populateOnInit: boolean = false;

    constructor(
        private globals: Globals,
        private router: Router,
        private service: SearchService,
        private translationService: TranslationEmitterService,
        private http: Http,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {

        this.tradeCtrl = new FormControl();
        this.locationCtrl = new FormControl();
        this.memberCtrl = new FormControl();
        
        this.translationSubscription = this.translationService.languageChange$.subscribe(
            lang => {
                console.log("triggering");
                this.refreshAutoCompleteItems(lang);
            }
        );

    }

    ngOnInit() {
        this.categorySubscription = this.service.getCategories().subscribe((categories: ICategory[]) => {
            this.categoryOptions = categories;
            this.filteredCategoryOptions = this.tradeCtrl.valueChanges
                .pipe(
                startWith(''),
                map(options => options ? this.categoryFilter(options) : this.categoryOptions.slice())
            );
            if (this.populateOnInit) {
                let category: number = +localStorage.getItem('trade'); 
                if (category > 0) {
                    let toSelect = categories.find(c => c.id === category); // Parse to Number if not a string
                    this.tradeCtrl.setValue(toSelect.name);
                }
            }
        });
  
        this.memberSubscription = this.service.getMembers().subscribe((members: ITraderDropDown[]) => {

            this.memberOptions = members;

            this.filteredMemberOptions = this.memberCtrl.valueChanges
                .pipe(
                startWith(''),
                map(options => options ? this.memberFilter(options) : this.memberOptions.slice())
                );

            if (this.populateOnInit) {
                let member: number = +localStorage.getItem('member');

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
                    let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

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
    setCenter(e: any) {
        e.preventDefault();
        //this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    }

    refreshAutoCompleteItems(lang: string) {
        console.log("in subscription " + lang);
    }

    categoryFilter(val: string): ICategory[] {
        this.toHighlight = val;
        return this.categoryOptions.filter(x =>
            // x.name.toUpperCase().indexOf(val.toUpperCase()) !== -1
            x.name
        );
    }

    memberFilter(val: string): ITraderDropDown[] {
        this.toHighlight = val;

        return this.memberOptions.filter(x =>
            x.name.toUpperCase().indexOf(val.toUpperCase()) !== -1
        );
    }

    onTradeSelected(event: any, selected: ICategory) {
        if (event.isUserInput) {
            this.trade = selected.id;
            this.selectedCategory = selected;
        }
    }

    searchTradeSubmit(): void {
        console.log("in the form submit");

        let error: boolean = false;

        console.log("trade :" + this.trade);
        console.log(this.trade == -1);

        if (this.trade == -1) {
            console.log("marking trade as dirty");
            this.tradeCtrl.markAsDirty();
            error = true;
        }

        console.log("HUUUUUUU")
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

    searchMemberSubmit(): void {
        console.log("search by member");
        
        let error: boolean = false;
        
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

}
