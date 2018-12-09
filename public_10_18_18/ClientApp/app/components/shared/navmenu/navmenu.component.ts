import { Injectable, Inject, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslationEmitterService } from '../../../services/translation.emitter.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [TranslationEmitterService]
})
export class NavMenuComponent {
    public isCollapsed = false;
    public status = false;

    load = false;

    constructor(
        private translate: TranslateService, 
        private translationEmitterService: TranslationEmitterService,
        protected _router : Router,
    ) {

    }

    ngOnInit() {
        
     }

    public switchLanguage(language: string) {
        console.log("switching language");
        this.translate.use(language);
        this.translationEmitterService.changeLanguage(language);
    }

    feedBackTraderRoute() {
        console.log("traderFeedbackKKKKKKKKKKKKKKKKKKK");
        this._router.navigate(['/traderFeedback']);
    }

    // Collapsed() {
    //     if(this.isCollapsed == false){
    //         this.isCollapsed = true;
    //     }
    //     else if(this.isCollapsed == true) {
    //         this.isCollapsed = false;
    //     }
    // }

    pushBodyContents() {
        if(this.isCollapsed == false){
            this.isCollapsed = true;
        }
        else if(this.isCollapsed == true) {
            this.isCollapsed = false;
        }
        console.log(this.isCollapsed);
        // let mainNav = document.querySelector('#mainNavbar');
        // // let mainNavHeight = mainNav.clientHeight;
        // let sample = mainNav.id;
        // let sample2 = mainNav.clientWidth;
        // let body = document.querySelectorAll('.ng-star-inserted')[0];
        

        // console.log({mainNav});
        // // console.log({mainNavHeight});
        // console.log({sample});
        // console.log({sample2});
        // console.log({body});
    }
}
