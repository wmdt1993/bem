var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SearchService } from '../../services/search.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Globals } from '../../globals/globals';
let TraderProfileComponent = class TraderProfileComponent {
    constructor(service, _router, route, globals) {
        this.service = service;
        this._router = _router;
        this.route = route;
        this.globals = globals;
        this.locality = localStorage.getItem('locality');
    }
    ngOnInit() {
        this.stylesmap = this.globals.stylesmap;
        // this.traderProfileSubscription = this.service.getTraderProfile(
        //     this.tradeProfileID
        // ).subscribe((traderProfile: ITraderProfile[]) => {
        //     this.
        // });
        this.getTraderProfile();
        this.asyncTabs = Observable.create((observer) => {
            setTimeout(() => {
                observer.next([
                    {
                        label: 'Profile',
                        name: this.traderProfile['name'],
                        telephone: this.traderProfile['telephone'],
                        email: this.traderProfile['email'],
                        website: this.traderProfile['website'],
                        profiles: this.traderProfile['profiles'],
                        addresses: this.traderProfile['addresses'],
                        contacts: this.traderProfile['contacts'],
                        categories: this.traderProfile['categories'],
                        notes: this.traderProfile['notes'],
                        gallery: this.traderProfile['gallery'],
                        reviews: this.traderProfile['review'],
                        reviewStatistic: this.traderProfile['reviewStatistics'],
                        traderQualifications: this.traderProfile['traderQualifications'],
                        insuranceDocuments: this.traderProfile['insuranceDocuments'],
                        userId: '',
                        user: '',
                        id: ''
                    },
                ]);
            }, 1000);
        });
    }
    seletedTab(tab) {
        console.log("SELECTED TAB IS " + tab);
    }
    getTraderProfile() {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log('getTraderProfile');
        console.log(id);
        this.service.getTraderProfile(id)
            .subscribe((trader) => {
            console.log("Your HEREeee");
            console.log(trader);
            this.traderProfile = trader;
            this.lat = trader['addresses'][1]['latitude'];
            this.lng = trader['addresses'][1]['longitude'];
            console.log(this.mainAddress = trader['addresses'][0]['address1']);
            this.traderProfile = trader;
            //   console.log(this.traderProfile );
            //   console.log("ASDFASDF");
        });
    }
};
TraderProfileComponent = __decorate([
    Component({
        selector: 'trader-profile',
        templateUrl: 'traderProfile.component.html',
        styleUrls: ['traderProfile.component.css'],
        providers: [SearchService]
    }),
    __metadata("design:paramtypes", [SearchService,
        Router,
        ActivatedRoute,
        Globals])
], TraderProfileComponent);
export { TraderProfileComponent };
//# sourceMappingURL=traderProfile.component.js.map