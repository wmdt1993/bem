import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TranslationEmitterService {
    private _languageChangedSource = new BehaviorSubject<any>("pt");
    languageChange$ = this._languageChangedSource.asObservable();


    changeLanguage(lang) {
        console.log("in change language " + lang);
        this._languageChangedSource.next(lang);
    }
}