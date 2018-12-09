import { Component} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupTraderComponent } from './../../../components/signuptrader/signuptrader.component';

@Component({
	selector: 'dialog-tradersignupsuccess',
	templateUrl: './tradersignupsuccess.component.html',
	styleUrls: ['./tradersignupsuccess.component.css']
})
export class TraderSignupSuccessComponent{

	constructor(
        public _dialogRef: MatDialogRef<SignupTraderComponent>
		){}
    
    closeDialog(): void {
        this._dialogRef.close();
      }


}
