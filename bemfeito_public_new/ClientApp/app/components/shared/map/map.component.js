var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
let MapComponent = class MapComponent {
    constructor() {
        this.trade = +localStorage.getItem('trade');
        this.latitude = +localStorage.getItem('latitude');
        this.longitude = +localStorage.getItem('longitude');
        this.postCode = +localStorage.getItem('postCode');
    }
    ngOnInit() {
        this.lat = this.latitude;
        this.lng = this.longitude;
    }
};
MapComponent = __decorate([
    Component({
        selector: 'map-results',
        templateUrl: 'map.component.html',
        styleUrls: ['map.component.css'],
    })
], MapComponent);
export { MapComponent };
//# sourceMappingURL=map.component.js.map