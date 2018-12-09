import { Injectable, Inject, Component } from '@angular/core';

@Component({
    selector: 'languageDropDown',
    templateUrl: './languageDropDown.component.html',
    styleUrls: ['./languageDropDown.component.css']
})
export class LanguageDropDownComponent {
    public isCollapsed = true;

    constructor() { }
}
