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
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ApiRequestsService } from './../../services/api-requests.service';
import { TraderSignupSuccessComponent } from './../../components/dialogs/tradersignupsuccess/tradersignupsuccess.component';
// import { AgmCoreModule, MapsAPILoader } from '@agm/core';
let SignupTraderComponent = class SignupTraderComponent {
    constructor(_apiRequest, _router, _formBuilder, _dialog) {
        this._apiRequest = _apiRequest;
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._dialog = _dialog;
        this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.hideProgressBar = true;
        this.googlePlaceOptions = {
            componentRestrictions: { country: 'pt' }
        };
        this.hideValidationIcon = [false, true, true];
        this.googlePostalCode = '';
        this.userAcceptedAddress = '';
        this.formattedAddress = '';
        this.addressComponent = [];
        this.initTraderForm();
    }
    initTraderForm() {
        this.traderForm = this._formBuilder.group({
            companyName: ['', Validators.required],
            fullName: ['', Validators.required],
            category: ['', Validators.required],
            address: ['', Validators.required],
            postCode: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            phone: ['', [Validators.required, Validators.maxLength(11)]],
            contactSMS: [true],
            contactTelephone: [true],
            contactEmail: [true],
            contactPost: [true]
        });
    }
    actionSignUp() {
        this.hideProgressBar = false;
        let data = JSON.parse(JSON.stringify(this.traderForm.value));
        data.address = this.formattedAddress;
        this._apiRequest.signUpApplicantTrader(this.splitAddress(data), '/trader/application')
            .subscribe(ret => {
            this.hideProgressBar = true;
            this.successMessage();
        });
    }
    successMessage() {
        let dialogRef = this._dialog.open(TraderSignupSuccessComponent, {
            width: '25vw'
        });
        dialogRef.afterClosed().subscribe(result => {
            this._router.navigate(['home']);
        });
    }
    googleAddressChange(address) {
        let partialData = JSON.parse(JSON.stringify(this.traderForm.value));
        let currentPostCode = partialData.postCode;
        console.log(currentPostCode);
        console.log(address);
        for (let address_component of address.address_components) {
            for (let type of address_component.types) {
                if (type == 'postal_code') {
                    this.googlePostalCode = address_component.long_name;
                    if (this.googlePostalCode.indexOf(currentPostCode) != -1) {
                        this.hideValidationIcon = [true, false, true];
                        for (let address_component_get_long_name of address.address_components) {
                            this.addressComponent.push(address_component_get_long_name.long_name);
                        }
                        console.log(this.addressComponent);
                    }
                    else {
                        this.hideValidationIcon = [true, true, false];
                        this.addressComponent = [];
                    }
                    break;
                }
            }
        }
    }
    postCodeChange(event) {
        if (this.googlePostalCode != '' && this.googlePostalCode != 'null') {
            if (event.target.value != this.googlePostalCode) {
                this.hideValidationIcon = [true, true, false];
            }
            else {
                this.hideValidationIcon = [true, false, true];
            }
        }
    }
    addressChange(event) {
        if (this.userAcceptedAddress != '' && this.userAcceptedAddress != 'null') {
            if (event.target.value != this.userAcceptedAddress) {
                this.hideValidationIcon = [true, true, false];
            }
            else {
                this.hideValidationIcon = [true, false, true];
            }
        }
    }
    splitAddress(applicantData) {
        let data = applicantData;
        data.address1 = '';
        data.address2 = '';
        data.address3 = '';
        data.town = '';
        data.region = '';
        let regionArray = [];
        for (var i = 0; i < this.addressComponent.length; i++) {
            if (i == 0) {
                data.address1 = this.addressComponent[i];
            }
            if (i == 1) {
                data.address2 = this.addressComponent[i];
            }
            if (i == 2) {
                data.address3 = this.addressComponent[i];
            }
            if (i == 3) {
                data.town = this.addressComponent[i];
            }
            if (i > 3) {
                regionArray.push(this.addressComponent[i]);
            }
        }
        if (regionArray.length > 0) {
            data.region = regionArray.join(", ");
        }
        return data;
    }
};
SignupTraderComponent = __decorate([
    Component({
        selector: 'app-signuptrader',
        templateUrl: './signuptrader.component.html',
        styleUrls: ['./signuptrader.component.css']
    }),
    __metadata("design:paramtypes", [ApiRequestsService,
        Router,
        FormBuilder,
        MatDialog])
], SignupTraderComponent);
export { SignupTraderComponent };
//# sourceMappingURL=signuptrader.component.js.map