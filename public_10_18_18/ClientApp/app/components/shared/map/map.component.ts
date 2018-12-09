import { Component } from '@angular/core';

@Component({
    selector: 'map-results',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css'],
})

export class MapComponent {
    lat: any;
    lng: any;
    lat2: 41.157250;
    lng2: -8.630322;

    trade = +localStorage.getItem('trade');
    latitude = +localStorage.getItem('latitude');
    longitude = +localStorage.getItem('longitude');
    postCode = +localStorage.getItem('postCode');


    ngOnInit() {
        this.lat = this.latitude;
        this.lng = this.longitude;
    }

}
