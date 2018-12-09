import { Injectable, Inject, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
    load = false;

    constructor(
        private router: Router,
    ) { }
    ngOnInit() {
         setTimeout(() => this.load = true, 80000);
         this.router.navigate(['/home']);
      }
}
