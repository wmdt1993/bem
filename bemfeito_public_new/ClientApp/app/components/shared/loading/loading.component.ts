import { 
    FormBuilder, 
    FormGroup, 
    Validators, 
    FormControl,
    AbstractControl,
    FormGroupDirective, 
    NgForm
} from '@angular/forms';

import {Component} from '@angular/core';

import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {


  estimateAccuracies = [1,2,3,4];

  

   selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

   experienceStepDataForm: FormGroup;

   // 

   // experienceStepDataForm = this._formBuilder.group({
   //          recommendTrader: ['yes'],
   //          estimateAccuracyId: ['' ],
   //          didCustomerKnowCouldLeaveFeedback: ['' ],
   //          moneyExchanged: ['' ],
   //          customerIssueId: ['' ],
   //          issueComments: '',
            
   //      });

  matcher = new MyErrorStateMatcher();



  constructor(private _formBuilder: FormBuilder){
     this.experienceStepDataForm = this._formBuilder.group({
            recommendTrader: ['yes'],
            estimateAccuracyId: ['' ],
            didCustomerKnowCouldLeaveFeedback: ['' ],
            moneyExchanged: ['' ],
            customerIssueId: ['' ],
            issueComments: '',
            
        });
  };

}






