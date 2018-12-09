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
import { MatDialogRef } from '@angular/material';
let TraderSignupSuccessComponent = class TraderSignupSuccessComponent {
    constructor(_dialogRef) {
        this._dialogRef = _dialogRef;
    }
    closeDialog() {
        this._dialogRef.close();
    }
};
TraderSignupSuccessComponent = __decorate([
    Component({
        selector: 'dialog-tradersignupsuccess',
        templateUrl: './tradersignupsuccess.component.html',
        styleUrls: ['./tradersignupsuccess.component.css']
    }),
    __metadata("design:paramtypes", [MatDialogRef])
], TraderSignupSuccessComponent);
export { TraderSignupSuccessComponent };
//# sourceMappingURL=tradersignupsuccess.component.js.map