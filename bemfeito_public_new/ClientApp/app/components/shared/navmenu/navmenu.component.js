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
import { TranslateService } from '@ngx-translate/core';
import { TranslationEmitterService } from '../../../services/translation.emitter.service';
import { Router } from '@angular/router';
let NavMenuComponent = class NavMenuComponent {
    constructor(translate, translationEmitterService, _router) {
        this.translate = translate;
        this.translationEmitterService = translationEmitterService;
        this._router = _router;
        this.isCollapsed = true;
        this.status = false;
        this.load = false;
    }
    ngOnInit() {
    }
    switchLanguage(language) {
        console.log("switching language");
        this.translate.use(language);
        this.translationEmitterService.changeLanguage(language);
    }
    feedBackTraderRoute() {
        console.log("traderFeedbackKKKKKKKKKKKKKKKKKKK");
        this._router.navigate(['/traderFeedback']);
    }
};
NavMenuComponent = __decorate([
    Component({
        selector: 'nav-menu',
        templateUrl: './navmenu.component.html',
        styleUrls: ['./navmenu.component.css'],
        providers: [TranslationEmitterService]
    }),
    __metadata("design:paramtypes", [TranslateService,
        TranslationEmitterService,
        Router])
], NavMenuComponent);
export { NavMenuComponent };
//# sourceMappingURL=navmenu.component.js.map