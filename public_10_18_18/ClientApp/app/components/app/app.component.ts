import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(["en", "pt", "fr"]);
        translate.setDefaultLang('pt');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|pt|fr/) ? browserLang : 'en');
    }


}
