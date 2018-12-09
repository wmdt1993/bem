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
    public isCollapsed = true;
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
}
