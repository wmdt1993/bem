import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    role: string = 'test';
    search: {
        latitude: number,
        longitude: number,
        postalCode: string,
        category: string,
        categoryId: number
    };

    stylesmap = [
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "saturation": 20
            },
            {
              "lightness": 40
            },
            {
              "weight": 8
            }
          ]
        }
      ]

}