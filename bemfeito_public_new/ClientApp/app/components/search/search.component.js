var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Globals } from '../../globals/globals';
let SearchComponent = class SearchComponent {
    constructor(globals) {
        this.globals = globals;
        // lat2: number = 52.678418;
        // lng2: number = 8.809007;
        this.load = false;
        this.trade = +localStorage.getItem('trade');
        this.latitude = +localStorage.getItem('latitude');
        this.longitude = +localStorage.getItem('longitude');
        this.postCode = +localStorage.getItem('postCode');
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
};
SearchComponent = __decorate([
    Component({
        selector: 'search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    }),
    __metadata("design:paramtypes", [Globals])
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map