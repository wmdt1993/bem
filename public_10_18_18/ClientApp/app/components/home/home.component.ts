import { Injectable, Inject, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    load = false;

    constructor( private router: Router) {}
    
    ngOnInit() {
         setTimeout(() => this.load = true, 3000);
      }
}
