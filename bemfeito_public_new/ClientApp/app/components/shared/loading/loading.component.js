var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher {
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
let LoadingComponent = class LoadingComponent {
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.estimateAccuracies = [1, 2, 3, 4];
        this.selected = new FormControl('valid', [
            Validators.required,
            Validators.pattern('valid'),
        ]);
        // 
        // experienceStepDataForm = this._formBuilder.group({
        //          recommendTrader: ['yes'],
        //          estimateAccuracyId: ['' ],
        //          didCustomerKnowCouldLeaveFeedback: ['' ],
        //          moneyExchanged: ['' ],
        //          customerIssueId: ['' ],
        //          issueComments: '',
        //      });
        this.matcher = new MyErrorStateMatcher();
        this.experienceStepDataForm = this._formBuilder.group({
            recommendTrader: ['yes'],
            estimateAccuracyId: [''],
            didCustomerKnowCouldLeaveFeedback: [''],
            moneyExchanged: [''],
            customerIssueId: [''],
            issueComments: '',
        });
    }
    ;
};
LoadingComponent = __decorate([
    Component({
        selector: 'loading',
        templateUrl: './loading.component.html',
        styleUrls: ['./loading.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder])
], LoadingComponent);
export { LoadingComponent };
//# sourceMappingURL=loading.component.js.map