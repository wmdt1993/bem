
import { ITraderProfile } from '../../models/trader.profile.interface';
import { Subscription } from 'rxjs/Rx';
import { SearchService } from '../../services/search.service';
import { Component, OnInit, ViewEncapsulation, NgModule } from '@angular/core';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators/map';

import { ActivatedRoute } from '@angular/router';

import {Observable, Observer} from 'rxjs';
import { Globals } from '../../globals/globals';




@Component({
    selector: 'trader-profile',
    templateUrl: 'traderProfile.component.html',
    styleUrls: ['traderProfile.component.css'],
    providers: [SearchService]
})


export class TraderProfileComponent implements OnInit{

    name: any;
    lat: number ;
    lng: number;
    mainAddress: any;
   traderProfile: ITraderProfile[];
   traderProfileSubscription: Subscription;
   locality: any = localStorage.getItem('locality');

   traderProfileContent: any;

   
  asyncTabs: Observable<ITraderProfile[]>;
  stylesmap: any;

    constructor(
        private service: SearchService,
        protected _router : Router,
        private route: ActivatedRoute,
        private globals: Globals,
    ) { 
        
    
      }

    ngOnInit() {
        this.stylesmap = this.globals.stylesmap;
        // this.traderProfileSubscription = this.service.getTraderProfile(
        //     this.tradeProfileID
        // ).subscribe((traderProfile: ITraderProfile[]) => {
        //     this.
        // });

        this.getTraderProfile();

        this.asyncTabs = Observable.create((observer: Observer<ITraderProfile[]>) => {
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
        console.log("SELECTED TAB IS "+tab);
    }

    getTraderProfile() {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log('getTraderProfile');
        console.log(id);
        this.service.getTraderProfile(id)
          .subscribe((trader: ITraderProfile[]) => {
              console.log("Your HEREeee");
              console.log(trader );
              this.traderProfile = trader;
              this.lat = trader['addresses'][1]['latitude'];
              this.lng = trader['addresses'][1]['longitude'];
              console.log(this.mainAddress = trader['addresses'][0]['address1']);
              this.traderProfile = trader;
            //   console.log(this.traderProfile );
            //   console.log("ASDFASDF");

            }
        );
    }
}
