import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiRequestsService } from './../../services/api-requests.service';
import { TraderSignupSuccessComponent } from './../../components/dialogs/tradersignupsuccess/tradersignupsuccess.component';
import { Address } from "ngx-google-places-autocomplete/objects/address";
// import { AgmCoreModule, MapsAPILoader } from '@agm/core';
@Component({
	selector: 'app-signuptrader',
	templateUrl: './signuptrader.component.html',
	styleUrls: ['./signuptrader.component.css']
})
export class SignupTraderComponent {

	traderForm: FormGroup;
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	hideProgressBar: boolean = true;
	googlePlaceOptions: any = {
		componentRestrictions: { country: 'pt' }
	};
	hideValidationIcon: any = [false, true, true];
	googlePostalCode: string = '';
	userAcceptedAddress: string = '';
	formattedAddress: string = '';
	addressComponent: any = [];

	constructor(
		protected _apiRequest: ApiRequestsService,
		protected _router: Router,
		private _formBuilder: FormBuilder,
		public _dialog: MatDialog,
	) {
		this.initTraderForm();
	}

	initTraderForm() {
		this.traderForm = this._formBuilder.group({
			companyName: ['', Validators.required],
			fullName: ['', Validators.required],
			category: ['', Validators.required],
			address: ['', Validators.required],
			postCode: ['', [Validators.required, Validators.minLength(4)]],
			email: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
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

	successMessage(): void {
		let dialogRef = this._dialog.open(TraderSignupSuccessComponent, {
			width: '25vw'
		});

		dialogRef.afterClosed().subscribe(result => {
			this._router.navigate(['home']);
		});
	}

	googleAddressChange(address: Address) {
		let partialData = JSON.parse(JSON.stringify(this.traderForm.value));
		let currentPostCode: string = partialData.postCode;
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
					} else {
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
				} else {
					this.hideValidationIcon = [true, false, true];
				}
			}

	}

	addressChange(event) {
		
			if (this.userAcceptedAddress != '' && this.userAcceptedAddress != 'null') {
				if (event.target.value != this.userAcceptedAddress) {
					this.hideValidationIcon = [true, true, false];
				} else {
					this.hideValidationIcon = [true, false, true];
				}
			}
	}

	splitAddress(applicantData): any{
		let data = applicantData;
		data.address1 = '';
		data.address2 = '';
		data.address3 = '';
		data.town = '';
		data.region = '';
		let regionArray: any = [];
		for (var i = 0; i < this.addressComponent.length; i++) {
			if(i == 0){
				data.address1 = this.addressComponent[i];
			}
			if(i == 1){
				data.address2 = this.addressComponent[i];
			}
			if(i == 2){
				data.address3 = this.addressComponent[i];
			}
			if(i == 3){
				data.town = this.addressComponent[i];
			}
			if(i > 3){
				regionArray.push(this.addressComponent[i]);
			}
		}

		if(regionArray.length > 0){
			data.region = regionArray.join(", ");
		}

		return data;

	}

}
