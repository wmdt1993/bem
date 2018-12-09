var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SearchService } from '../../services/search.service';
import { Component, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { fadeInAnimation } from '../../animations/fadeIn.animation';
import { slideInFadeInAnimation } from '../../animations/slideInFadeIn.animation';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { startWith } from 'rxjs/operators/startWith';
import { ApiRequestsService } from '../../services/api-requests.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher {
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
let TraderFeedbackComponent = class TraderFeedbackComponent {
    constructor(
    // public _navcomponents: NavComponentsService,
    _router, 
    // public _datasShare: DataShareService,
    _formBuilder, _httpRequest, service, mapsAPILoader, mapsAPILoader2, mapsAPILoader3, ngZone, ngZone2, ngZone3) {
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._httpRequest = _httpRequest;
        this.service = service;
        this.mapsAPILoader = mapsAPILoader;
        this.mapsAPILoader2 = mapsAPILoader2;
        this.mapsAPILoader3 = mapsAPILoader3;
        this.ngZone = ngZone;
        this.ngZone2 = ngZone2;
        this.ngZone3 = ngZone3;
        this.selected = new FormControl('valid', [
            Validators.required,
            Validators.pattern('valid'),
        ]);
        this.estimateAccuracies = [];
        this.selectedEstimateAccuracy = { name: 'None Selected', id: 0 };
        this.customerIssues = [];
        this.selectedCustomerIssue = { name: 'None Selected', id: 0 };
        this.languages = [];
        this.customerIssueNoMoneyExchanged = [];
        this.selectedCustomerIssueNoMoneyExchanged = { name: 'None Selected', id: 0 };
        this.customerIssueNoMoneyExchangedSelectedLanguage = [];
        this.customerIssueMoneyExchanged = [];
        this.selectedCustomerIssueMoneyExchanged = { name: 'None Selected', id: 0 };
        this.customerIssueMoneyExchangedSelectedLanguage = [];
        // customerIssueMoneyExchangedSelectedLanguage: any = [];
        // customerIssueMoneyExchangedSelectedLanguage: any = [];
        this.defaultLanguage = { id: 1, code: 'en', country: 'United Kingdom' };
        this.toHighlight = '';
        this.trader = -1;
        this.isLinear = true;
        this.traderFeedback = true;
        this.traderFeedbackSearch = false;
        this.traderFeedbackNO = true;
        this.traderFeedbackSearchNO = false;
        this.currentDate = new FormControl(new Date());
        this.scores = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 'N/A'];
        this.tidinessOptions = [
            "(score 10) Excellent tidiness",
            "(score 9) Very impressed with tidiness",
            "(score 8) Impressed with tidiness",
            "(score 7) Everything clean and tidy",
            "(score 6) Satisfied with how things had been left",
            "(score 5) A little bit untidy",
            "(score 4) Disappointed with mess left behind",
            "(score 3) Had to spend a little time cleaning after they left",
            "(score 2) Had to spend a lot of time cleaning after they left",
            "(score 1) Had to employ another company to tidy up after them",
            "(score 0) Certain areas/items need replacing",
            "Not applicable"
        ];
        this.reliabilityOptions = [
            "(score 10) Excellent reliability and timekeeping",
            "(score 9) Very impressed with reliability and timekeeping",
            "(score 8) They worked around my timing",
            "(score 7) Always arrived on time and left on time",
            "(score 6) Majority of time they arrived and left on time",
            "(score 5) Arrived slightly late but kept me informed",
            "(score 4) Arrived very late but kept me informed",
            "(score 3) Arrived slightly late, didn’t keep me informed",
            "(score 2) Arrived very late, didn’t keep me informed",
            "(score 1) Didn’t show up at all but kept me informed",
            "(score 0) Didn’t show up at all and didn’t keep me informed",
            "Not applicable"
        ];
        this.courtesyOptions = [
            "(score 10) Excellent courtesy",
            "(score 9) Very impressed with courtesy",
            "(score 8) Very polite and very helpful",
            "(score 7) Polite and helpful",
            "(score 6) Neither helpful or unhelpful",
            "(score 5) Unhelpful",
            "(score 4) Not Courteous at all",
            "(score 3) Rude",
            "(score 2) Rude and using bad language",
            "(score 1) Verbally abusive",
            "(score 0) Very abusive",
            "Not applicable"
        ];
        this.workmanshipOptions = [
            "(score 10) Excellent workmanship",
            "(score 9) Very impressed with workmanship",
            "(score 8) Impressed with workmanship",
            "(score 7) High quality workmanship",
            "(score 6) Good quality workmanship",
            "(score 5) Fair quality workmanship",
            "(score 4) Didn't meet my expectations",
            "(score 3) Poor quality workmanship",
            "(score 2) Some of the work needs to be redone",
            "(score 1) Most of the work needs to be redone",
            "(score 0) Everything has to be re-done",
            "Not applicable"
        ];
        this.titleNames = [
            'Mr',
            'Mrs',
            'Miss',
            'Ms',
            'Mr & Mrs',
            'Dr',
            'Rev',
            'Revd'
        ];
        this.hearAboutBemfeito = [
            'Directory',
            'Sports sponsorship',
            'Word of mouth',
            'TV',
            'Online',
            'Radio',
            'Trader (including feedback cards)',
            'Other',
        ];
        this.tradespersonLeavingFeedback = [
            'Found the Tradesperson via bemfeito.com',
            'Directed to bemfeito.com by the Tradesperson'
        ];
        this.populateOnInit = false;
        this.checkEstimateAccuracyId = true;
        this.checkDidCustomerKnowCouldLeaveFeedback = true;
        this.checkCustomerIssueId = true;
        this.checkReliability = true;
        this.checkTidiness = true;
        this.checkCourtsey = true;
        this.checkWorkmanship = true;
        this.checkBriefWorkDescription = true;
        this.checkWorkCompletedDate = true;
        this.checkDaysToCompleteWork = true;
        this.checkWorkUnderWarranty = true;
        this.checkContactedTradeAboutComplaint = true;
        this.checkWorkComments = true;
        this.checkTradeCompaintResponse = true;
        this.checkTitle = true;
        this.checkTitleName = true;
        this.checkCustomerName = true;
        this.checkAddress1 = true;
        this.checkCustomerMobile = true;
        this.checkCustomerTelephone = true;
        this.checkCustomerEmail = true;
        this.checkBestContactTime = true;
        this.checkVerificationPreference = true;
        this.checkHowDidHearAboutReviewService = true;
        this.checkHowDidyouFindTraderReviewService = true;
        this.checkReceiveUpdates = true;
        this.checkReceiveThirdPartyUpdates = true;
        this.checkReasonForNotPublishing = true;
        this.checkCanTraderContactForResolution = true;
        this.requiredRecommendTrader = true;
        this.requiredCustomerIssueId = true;
        this.requiredDidCustomerKnowCouldLeaveFeedback = true;
        this.findTrader = false;
        this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
        this.matcher = new MyErrorStateMatcher();
        this.myFilter = (d) => {
            const day = d.getDay();
            // Prevent Saturday and Sunday from being selected.
            return day !== 0 && day !== 6;
        };
        // _datasShare.setHiddenSpinner(false);
        this.tradeCtrl = new FormControl();
        this.traderCtrl = new FormControl();
        this.locationCtrl = new FormControl();
        this.locationCtrl2 = new FormControl();
        this.locationCtrl3 = new FormControl();
        this.createTraderReviewForm();
        this.getAllLanguages();
        this.getAllEstimateAccuracy();
        this.getAllCustomerIssue();
        this.getCustomerIssueNoMoneyExchanged();
        this.getCustomerIssueMoneyExchanged();
    }
    ngOnInit() {
        // // this._navcomponents.show();
        // if (localStorage.getItem('token') == null) {
        //     this._router.navigate(['login']);
        //     this._navcomponents.hide();
        // }
        this.locationCtrl.setValue("");
        this.locationCtrl2.setValue("");
        this.locationCtrl3.setValue("");
        this.next = false;
        this.categorySubscription = this.service.getCategories().subscribe((categories) => {
            this.categoryOptions = categories;
            this.filteredCategoryOptions = this.tradeCtrl.valueChanges
                .pipe(startWith(''), map(options => options ? this.categoryFilter(options) : this.categoryOptions.slice()));
            if (this.populateOnInit) {
                let category = +localStorage.getItem('trade');
                if (category > 0) {
                    let toSelect = categories.find(c => c.id === category); // Parse to Number if not a string
                    this.tradeCtrl.setValue(toSelect.name);
                }
            }
        });
        this.traderSubscription = this.service.getMembers().subscribe((members) => {
            this.traderOptions = members;
            // console.log("optionsss")
            // console.log(this.traderOptions);
            this.filteredTraderOptions = this.traderCtrl.valueChanges
                .pipe(startWith(''), map(options => options ? this.traderFilter(options) : this.traderOptions.slice()));
            // console.log(this.filteredTraderOptions );
            // console.log("passing through filteredTraderOptions");
            if (this.populateOnInit) {
                let category = +localStorage.getItem('trade');
                if (category > 0) {
                    // console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWw");
                    // console.log(category);
                    let toSelect = members.find(c => c.id === category); // Parse to Number if not a string
                    this.traderCtrl.setValue(toSelect.name);
                }
            }
        });
        console.log("LOAD");
        //load Places Autocomplete
        console.log("address 1");
        // address 1
        this.mapsAPILoader.load().then(() => {
            console.log("this.mapsAPILoader");
            this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"],
                componentRestrictions: { country: "pt" }
            });
            // console.log("this.autocomplete---------");
            // console.log(this.autocomplete);
            // this.locationCtrlRegion = this.autocomplete;
            // this.locationCtrlPostCode = ;
            // this.locationCtrlTown = ;
            console.log("this.autocomplete");
            console.log(this.autocomplete);
            this.autocomplete.addListener("place_changed", () => {
                console.log("this.autocomplete.addListener");
                this.ngZone.run(() => {
                    console.log("this.ngZone.run");
                    //get the place result
                    let place = this.autocomplete.getPlace();
                    console.log("place");
                    console.log(place);
                    this.locationCtrlRegion = place['address_components'][3]['long_name'];
                    this.locationCtrlTown = place['address_components'][2]['long_name'];
                    this.locationCtrlPostCode = place['address_components'][5]['long_name'];
                    // console.log("let place: google.maps.places.PlaceResult = this.autocomplete.getPlace()");
                    // console.log(this.autocomplete.getPlace());
                    // console.log(place);
                    //verify result
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                    // try {
                    // console.log("tryyyy  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                    if (place.geometry === undefined || place.geometry === null) {
                        this.locationCtrl.setValue("");
                        return;
                    }
                    // console.log(JSON.stringify(place.address_components[5]['long_name']) );
                    // console.log(JSON.stringify(place.address_components[2]['long_name']) );
                    // console.log("eeeeeeeeeee xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                    this.locationCtrl.setValue(place.formatted_address.toString());
                    // this.locationCtrlPostCode = place;
                    // console.log(this.autocomplete.getPlace());
                    // console.log(place);
                    // } catch(e) {
                    //     console.log(e);
                    // }
                    // console.log("AUTOCOMPLETEEEEEE");
                    // // console.log(this.autocomplete['place']['address_components'][5]['long_name']);
                    // console.log(this.autocomplete.getPlace());
                    // console.log(this.autocomplete);
                    // // console.log(this.autocomplete['place']['address_components']);
                    // console.log("AUUUUUU")
                    // console.log("ADDRESSSSSSSSSSSSS !!!111111111111111");
                    // console.log(place);
                });
            });
        });
        // address 2
        this.mapsAPILoader2.load().then(() => {
            console.log("this.mapsAPILoader222");
            this.autocomplete2 = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement, {
                types: ["address"],
                componentRestrictions: { country: "pt" }
            });
            // console.log("PLACESSS");
            // console.log(this.autocomplete);
            console.log("this.autocomplete22");
            console.log(this.autocomplete2);
            this.autocomplete2.addListener("place_changed", () => {
                this.ngZone2.run(() => {
                    console.log("this.ngZone2222.run");
                    //get the place result
                    let place = this.autocomplete2.getPlace();
                    console.log("place2");
                    console.log(place);
                    this.locationCtrl2Region = place['address_components'][3]['long_name'];
                    this.locationCtrl2Town = place['address_components'][2]['long_name'];
                    this.locationCtrl2PostCode = place['address_components'][5]['long_name'];
                    // console.log(place);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        this.locationCtrl2.setValue("");
                        return;
                    }
                    this.locationCtrl2.setValue(place.formatted_address.toString());
                });
            });
        });
        // address 3
        this.mapsAPILoader3.load().then(() => {
            this.autocomplete3 = new google.maps.places.Autocomplete(this.searchElementRef3.nativeElement, {
                types: ["address"],
                componentRestrictions: { country: "pt" }
            });
            // console.log("PLACESSS");
            // console.log(this.autocomplete);
            this.autocomplete3.addListener("place_changed", () => {
                this.ngZone3.run(() => {
                    //get the place result
                    let place = this.autocomplete3.getPlace();
                    console.log("place3");
                    console.log(place);
                    this.locationCtrl3Region = place['address_components'][3]['long_name'];
                    this.locationCtrl3Town = place['address_components'][2]['long_name'];
                    this.locationCtrl3PostCode = place['address_components'][5]['long_name'];
                    // console.log(place);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        this.locationCtrl3.setValue("");
                        return;
                    }
                    this.locationCtrl3.setValue(place.formatted_address.toString());
                });
            });
        });
    }
    ngAfterViewInit() {
        this.trigger.panelClosingActions
            .subscribe(e => {
            if (!(e && e.source)) {
                this.traderCtrl.setValue(null);
                this.trader = -1;
                this.toHighlight = '';
                this.trigger.closePanel();
            }
        });
    }
    ngOnDestroy() {
        this.traderSubscription.unsubscribe();
    }
    categoryFilter(val) {
        this.toHighlight = val;
        return this.categoryOptions.filter(x => 
        // x.name.toUpperCase().indexOf(val.toUpperCase()) !== -1
        x.name);
    }
    traderFilter(val) {
        this.toHighlight = val;
        return this.traderOptions.filter(x => 
        // x.name.toUpperCase().indexOf(val.toUpperCase()) !== -1
        x.name);
    }
    onTraderSelected(event, selected) {
        if (event.isUserInput) {
            this.trader = selected.id;
            this.selectedTrader = selected;
        }
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(this.trader);
        console.log(selected);
        this.traderName = selected.name;
        // console.log("onTraderSelected");
        this.getTrader(this.trader);
        this.next = true;
    }
    onLocationFocusOut(address) {
        // console.log("Focus out called");
        // console.log(this.autocomplete.getPlace());
        var service = new google.maps.places.AutocompleteService();
        // console.log("logging the input ctrl----------");
        // console.log(this.locationCtrl);
        let options;
        if (address === "address1") {
            options = {
                input: this.locationCtrl.value,
                types: ['address'],
                componentRestrictions: { country: 'pt' }
            };
        }
        if (address === "address2") {
            options = {
                input: this.locationCtrl2.value,
                types: ['address'],
                componentRestrictions: { country: 'pt' }
            };
        }
        if (address === "address3") {
            options = {
                input: this.locationCtrl3.value,
                types: ['address'],
                componentRestrictions: { country: 'pt' }
            };
        }
        service.getPlacePredictions(options, this.selectPrediction);
    }
    selectPrediction(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            // console.log(status);
            return;
        }
        // console.log(predictions);
        // console.log(predictions.length);
        if (predictions.length > 0) {
            // console.log("setting the value:");
            // console.log(this.locationCtrl);
            try {
                this.locationCtrl.setValue(predictions[0].description.toString());
                // console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy");
                // console.log(predictions);
            }
            catch (e) {
                // console.log(e);
            }
            try {
                this.locationCtrl2.setValue(predictions[0].description.toString());
            }
            catch (e) {
                // console.log(e);
            }
            try {
                this.locationCtrl3.setValue(predictions[0].description.toString());
            }
            catch (e) {
                // console.log(e);
            }
        }
        else {
            try {
                this.locationCtrl.markAsDirty();
                this.locationCtrl.setValue("");
            }
            catch (e) {
                // console.log(e);
            }
            try {
                this.locationCtrl2.markAsDirty();
                this.locationCtrl2.setValue("");
            }
            catch (e) {
                // console.log(e);
            }
            try {
                this.locationCtrl3.markAsDirty();
                this.locationCtrl3.setValue("");
            }
            catch (e) {
                // console.log(e);
            }
        }
    }
    getTrader(traderID) {
        this._httpRequest.getTrader('/trader/address/' + traderID)
            .subscribe(ret => {
            // console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
            // console.log(ret);
            this.traderAddress = ret['address1'];
            // console.log(this.estimateAccuracies);
        });
    }
    backSearchTraderFeedback() {
        this.traderFeedback = true;
        this.traderFeedbackSearch = false;
    }
    backSearchTraderFeedbackNO() {
        this.traderFeedbackNO = true;
        this.traderFeedbackSearchNO = false;
    }
    searchTraderNOSubmit() {
        // console.log("START SEARCH TRADEEEEEEEE");
        // console.log(this.trader);
        this.traderFeedbackNO = false;
        this.traderFeedbackSearchNO = true;
        this.traderFeedbackSearch = true;
    }
    searchTraderSubmit() {
        // console.log("START SEARCH TRADEEEEEEEE");
        // console.log(this.trader);
        this.traderFeedback = false;
        this.traderFeedbackSearch = true;
        //     let error: boolean = false;
        //     console.log("trade :" + this.trade);
        //     console.log(this.trade == -1);
        //     if (this.trade == -1) {
        //         console.log("marking trade as dirty");
        //         this.tradeCtrl.markAsDirty();
        //         error = true;
        //     }
        //     console.log("HUUUUUUU")
        //     console.log("lat :" + this.latitude);
        //     console.log("long :" + this.longitude);
        //     console.log("place :" + this.pl);
        //     console.log("postal code :" + this.postCode);
        //     console.log("locality locality :" + this.locality);
        //     if (this.latitude == -1 || this.longitude == -1) {
        //         console.log("marking address input as dirty");
        //         this.locationCtrl.markAsDirty();
        //         error = true;
        //     }
        //     if (!error) {
        //         console.log("NOT ERROR");
        //         console.log('selected category');
        //         console.dir(this.selectedCategory);
        //         console.dir(this.selectedCategory.translations);
        //         console.dir(this.selectedCategory.translations[0]);
        //         console.dir(this.selectedCategory.translations[0]['name']);
        //         localStorage.setItem('selectedCategory', this.selectedCategory.translations[0]['name'].toString());
        //         localStorage.setItem('trade', this.trade.toString());
        //         localStorage.setItem('latitude', this.latitude.toString());
        //         localStorage.setItem('longitude', this.longitude.toString());
        //         localStorage.setItem('postCode', this.postCode.toString());
        //         localStorage.setItem('locality', this.locality.toString());
        //         localStorage.setItem('locationText', this.locationCtrl.value);
        //         console.log("END SUCCEss SEARCH TRADEEEEEEEE");
        //         this.router.navigate(['/search']);
        //     } else {
        //         console.log("ERROR");
        //     }
    }
    createTraderReviewForm() {
        // this.formTraderFeedbackGroup = this._formBuilder.group({
        //     formArray: this._formBuilder.array([
        //       this._formBuilder.group({
        //         traderCtrl: ['', Validators.required],
        //         // lastNameFormCtrl: ['', Validators.required],
        //       }),
        //       this._formBuilder.group({
        //         recommendTrader: ['', Validators.required],
        //         moneyExchanged: ['', Validators.required],
        //         issueComments: ['', Validators.required],
        //         publishFeedback: ['', Validators.required],
        //         canTraderContactForResolution: ['', Validators.required],
        //         reasonForNotPublishing: ['', Validators.required],
        //         didCustomerKnowCouldLeaveFeedback: ['', Validators.required],
        //       }),
        //       this._formBuilder.group({
        //         tidiness: ['', Validators.required],
        //         reliability: ['', Validators.required],
        //         courtsey: ['', Validators.required],
        //         workmanship: ['', Validators.required],
        //       }),
        //     ])
        //   });
        this.reviewTradersDataForm = this._formBuilder.group({
            traderId: '',
            recommendTrader: ['', Validators.required],
            moneyExchanged: '',
            publishFeedback: '',
            reasonForNotPublishing: '',
            canTraderContactForResolution: '',
            estimateAccuracyId: '',
            customerIssueId: '',
            reliability: '',
            tidiness: '',
            courtsey: '',
            workmanship: '',
            chargedCorrectly: '',
            didCustomerKnowCouldLeaveFeedback: ['', Validators.required],
            workUnderWarranty: '',
            contactedTradeAboutComplaint: '',
            tradeCompaintResponse: '',
            appointmentMissedDate: '',
            appointmentsMissed: '',
            briefWorkDescription: '',
            workCompletedDate: '',
            daysToCompleteWork: '',
            issueComments: '',
            workComments: '',
            title: '',
            titleName: '',
            customerName: '',
            address1: '',
            address2: '',
            address3: '',
            town: '',
            region: '',
            postalCode: '',
            customerEmail: '',
            customerMobile: '',
            customerTelephone: '',
            customerLocation: '',
            bestContactTime: '',
            verificationPreference: '',
            valueOfWork: '',
            howDidHearAboutReviewService: '',
            howDidyouFindTraderReviewService: '',
            receiveUpdates: '',
            receiveThirdPartyUpdates: ''
        });
        requiredRecommendTrader = true;
        requiredCustomerIssueId = true;
        requiredDidCustomerKnowCouldLeaveFeedback = true;
        requiredEstimateAccuracyId = true;
        requiredMoneyExchanged = true;
        requiredIssueComments = true;
        requiredReliability = true;
        requiredTidiness = true;
        requiredCourtsey = true;
        requiredWorkmanship = true;
        BriefWorkDescription = true;
        workCompletedDate = true;
        daysToCompleteWork = true;
        workUnderWarranty = true;
        contactedTradeAboutComplaint = true;
        workComments = true;
        tradeCompaintResponse = true;
        this.experienceStepDataForm = this._formBuilder.group({
            recommendTrader: ['yes'],
            estimateAccuracyId: [''],
            didCustomerKnowCouldLeaveFeedback: [''],
            moneyExchanged: ['yes'],
            customerIssueId: [''],
            issueComments: '',
        });
        this.scoresStepDataForm = this._formBuilder.group({
            reliability: [''],
            tidiness: [''],
            courtsey: [''],
            workmanship: [''],
            briefWorkDescription: [''],
            workCompletedDate: [''],
            daysToCompleteWork: [''],
            workUnderWarranty: [''],
            contactedTradeAboutComplaint: [''],
            workComments: [''],
            tradeCompaintResponse: [''],
        });
        this.detailsStepDataForm = this._formBuilder.group({
            title: ['individual'],
            titleName: [''],
            customerName: [''],
            // address1: ['' ],
            // address2: ['' ],
            // address3: ['' ],
            // town: ['' ],
            // region: [''],
            // postalCode: ['' ],
            customerEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            customerMobile: [''],
            customerTelephone: [''],
            //customerLocation: ['' ],
            bestContactTime: [''],
            verificationPreference: [''],
            howDidHearAboutReviewService: [''],
            howDidyouFindTraderReviewService: [''],
            receiveUpdates: [''],
            receiveThirdPartyUpdates: [''],
        });
        this.futherStepDataForm = this._formBuilder.group({
            valueOfWork: [''],
            publishFeedback: [''],
            canTraderContactForResolution: [''],
            reasonForNotPublishing: [''],
        });
        this.scoresStepDataFormNoCompany = this._formBuilder.group({
            briefWorkDescription: [''],
            workCompletedDate: [''],
            daysToCompleteWork: [''],
            workComments: [''],
        });
    }
    getAllEstimateAccuracy() {
        this._httpRequest.getEstimateAccuracy('/EstimateAccuracy')
            .subscribe(ret => {
            const ams = ret;
            for (const am of ams) {
                this.estimateAccuracies.push({ 'name': am.text, 'id': am.id });
            }
            // console.log(this.estimateAccuracies);
        });
    }
    getAllCustomerIssue() {
        this._httpRequest.getCustomerIssue('/CustomerIssue')
            .subscribe(ret => {
            const ams = ret;
            //console.log(ret);
            for (const am of ams) {
                this.customerIssues.push({ 'name': am.translations[0].name, 'id': am.translations[0].id });
            }
            //console.log(this.customerIssues);
        });
    }
    getAllLanguages() {
        this._httpRequest.getAllLanguages('/Language')
            .subscribe(ret => {
            const ams = ret;
            // console.log(ret);
            for (const am of ams) {
                this.languages.push({ 'name': am.country, 'id': am.id, 'code': am.code });
            }
            // console.log(this.languages);
            this.selectedLanguageDefault = this.languages[0]['name'];
        });
    }
    getCustomerIssueNoMoneyExchanged() {
        this._httpRequest.getCustomerIssueNoMoneyExchanged('/CustomerIssue/noMoneyExchanged')
            .subscribe(ret => {
            const ams = ret;
            // console.log("noMoneyExchanged");
            // console.log(ret);
            for (const am of ams) {
                for (const trans of am.translations) {
                    this.customerIssueNoMoneyExchanged.push({
                        'name': trans.name,
                        'code': trans.language.code,
                        'country': trans.language.country,
                        'id': am.id
                    });
                }
            }
            try {
                for (const data of this.customerIssueNoMoneyExchanged) {
                    if (this.languages[0]['code'] === data.code) {
                        this.customerIssueNoMoneyExchangedSelectedLanguage.push({
                            'name': data.name,
                            'code': data.code,
                            'country': data.country,
                            'id': data.id
                        });
                    }
                }
                // console.log('eeeeeeeeeeeeeeeeeeeeeeeeee');
                // console.log(this.customerIssueNoMoneyExchangedSelectedLanguage);
                this.selectedIssueNoMoneyExchangedDefault = this.customerIssueNoMoneyExchangedSelectedLanguage[0]['name'];
            }
            catch (e) {
                // console.log(e);
            }
        });
    }
    // customerIssueMoneyExchangedSelectedLanguage
    getCustomerIssueMoneyExchanged() {
        this._httpRequest.getCustomerIssueMoneyExchanged('/CustomerIssue/moneyExchanged')
            .subscribe(ret => {
            const ams = ret;
            // console.log("moneyExchanged");
            // console.log(this.languages[0]['code']);
            // console.log(ret);
            for (const am of ams) {
                for (const trans of am.translations) {
                    this.customerIssueMoneyExchanged.push({
                        'name': trans.name,
                        'code': trans.language.code,
                        'country': trans.language.country,
                        'id': am.id
                    });
                }
            }
            try {
                for (const data of this.customerIssueMoneyExchanged) {
                    if (this.languages[0]['code'] === data.code) {
                        this.customerIssueMoneyExchangedSelectedLanguage.push({
                            'name': data.name,
                            'code': data.code,
                            'country': data.country,
                            'id': data.id
                        });
                    }
                }
                //console.log(this.languages[0]);
                //console.log('zzzzzzzzzzzzzzzzzzzzzzzzz');
                //console.log(this.customerIssueMoneyExchangedSelectedLanguage);
                this.selectedIssueMoneyExchangedDefault = this.customerIssueMoneyExchangedSelectedLanguage[0]['name'];
            }
            catch (e) {
                //console.log(e);
            }
        });
    }
    getSelectedLanguage(data) {
        //console.log("SELECTED");
    }
    onChange(event) {
        const country = event.value;
        // console.log(event);
        // console.log("ONCHANGEEEEEEEEEEEEEEEEEEe");
        // console.log(country);
        this.customerIssueMoneyExchangedSelectedLanguage = [];
        this.customerIssueNoMoneyExchangedSelectedLanguage = [];
        // console.log(event.target.option['0']);
        // for (const data of event.target) {
        //     for (const op of data.option) {
        //         console.log(op.text);
        //     }
        // }
        // console.log(this.customerIssueMoneyExchangedSelectedLanguage);
        // console.log(this.customerIssueNoMoneyExchangedSelectedLanguage);
        for (const data of this.customerIssueMoneyExchanged) {
            // console.log(data.country);
            // console.log(data);
            if (country === data.country) {
                // console.log("YES");
                this.customerIssueMoneyExchangedSelectedLanguage.push({
                    'name': data.name,
                    'code': data.code,
                    'country': data.country
                });
            }
            else {
                console.log("NO");
            }
        }
        for (const data of this.customerIssueNoMoneyExchanged) {
            // console.log(data.country);
            // console.log(data);
            if (country === data.country) {
                this.customerIssueNoMoneyExchangedSelectedLanguage.push({
                    'name': data.name,
                    'code': data.code,
                    'country': data.country
                });
            }
        }
        this.selectedIssueMoneyExchangedDefault = this.customerIssueMoneyExchangedSelectedLanguage[0]['name'];
        this.selectedIssueNoMoneyExchangedDefault = this.customerIssueNoMoneyExchangedSelectedLanguage[0]['name'];
        // console.log(this.customerIssueMoneyExchangedSelectedLanguage);
        // console.log(this.customerIssueNoMoneyExchangedSelectedLanguage);
    }
    recommendTraderEvent() {
        console.log("recommendTraderEvent CLICKEDDDDD");
    }
    proceedStep2(formControl) {
        console.log("PROCEED STEP 222222222222");
        console.log(this.recommendTraderYes);
        console.log(this.recommendTraderNo);
        console.log(this.experienceStepDataForm);
        const form = this.experienceStepDataForm;
        //console.log(formControl.controls['estimateAccuracyId']['pristine']);
        console.log(this.experienceStepDataForm['value']['customerIssueId'].toString().split(",")[0]);
        console.log(this.experienceStepDataForm['value']['customerIssueId'].toString().split(",")[1]);
        console.log(this.experienceStepDataForm);
        console.log(this.experienceStepDataForm['value']);
        console.log(this.experienceStepDataForm['value']['customerIssueId']);
        console.log(typeof (this.experienceStepDataForm['value']['customerIssueId']));
        console.log(this.experienceStepDataForm['value']['customerIssueId'].toString().split(","));
        console.log(typeof (this.experienceStepDataForm['value']['customerIssueId'].toString().split(",")));
        let es = this.experienceStepDataForm['value']['customerIssueId'].toString().split(",");
        console.log(es[0]);
        console.log(es[1]);
        const formDataString = JSON.parse(JSON.stringify(this.experienceStepDataForm.value));
        console.log(formDataString);
        // console.log(formDataString['recommendTrader'].toString());
        // if ( formDataString['recommendTrader'].toString() === "yes" ){
        //      console.log("YESSSs");
        // }
        // else {
        //     console.log("NOOOOO")
        // }
        // console.log("STEP ENDDD");
        // if ( form.value['recommendTrader'] === "yes" ) {
        //     console.log("YESSSSSSSSSSSSs");
        //     if ((form.controls['estimateAccuracyId'].pristine === true && form.value['estimateAccuracyId'] === '')) {
        //         //console.log('estimateAccuracyIdpppppppppppppppppppppppppp pristine or touched');
        //         this.checkEstimateAccuracyId = false;
        //     } else {
        //         this.checkEstimateAccuracyId = true;
        //     }
        //     if ((form.controls['didCustomerKnowCouldLeaveFeedback'].pristine === true && form.value['didCustomerKnowCouldLeaveFeedback'] === '')) {
        //         //console.log('didCustomerKnowCouldLeaveFeedbackkkkkkkkkkkkk pristine or touched');
        //         this.checkDidCustomerKnowCouldLeaveFeedback = false;
        //     } else {
        //         this.checkDidCustomerKnowCouldLeaveFeedback = true;
        //     }
        // } else if ( form.value['recommendTrader'] === "no" ) {
        //     console.log("NOOOOOOOOOOOOO");
        //     if( form.value['moneyExchanged'] === "yes") {
        //     } else if (form.value['moneyExchanged'] === "no") {
        //     }
        // }
        switch (form.value['recommendTrader']) {
            case "yes":
                console.log("Re YES");
                if (form.controls['estimateAccuracyId'].pristine === true && form.value['estimateAccuracyId'] === '') {
                    this.checkEstimateAccuracyId = false;
                }
                else {
                    this.checkEstimateAccuracyId = true;
                }
                if (form.controls['didCustomerKnowCouldLeaveFeedback'].pristine === true && form.value['didCustomerKnowCouldLeaveFeedback'] === '') {
                    this.checkDidCustomerKnowCouldLeaveFeedback = false;
                }
                else {
                    this.checkDidCustomerKnowCouldLeaveFeedback = true;
                }
                break;
            case "no":
                console.log("Re NO");
                console.log(form.value['moneyExchanged']);
                switch (form.value['moneyExchanged']) {
                    case "yes":
                        console.log("Mon YES");
                        if (form.controls['customerIssueId'].pristine === true && form.value['customerIssueId'] === '') {
                            this.checkCustomerIssueId = false;
                        }
                        else {
                            this.checkCustomerIssueId = true;
                        }
                    case "no":
                        console.log("Mon NO");
                        if (form.controls['customerIssueId'].pristine === true && form.value['customerIssueId'] === '') {
                            this.checkCustomerIssueId = false;
                        }
                        else {
                            this.checkCustomerIssueId = true;
                        }
                }
        }
        // if (this.experienceStepDataForm.value['estimateAccuracyId'] === "") {
        //   this.checkEstimateAccuracyId = false;
        // }
        // console.log("estimateAccuracyId----------------");
        // console.log(this.experienceStepDataForm.value['estimateAccuracyId']);
        // if (this.experienceStepDataForm.value['didCustomerKnowCouldLeaveFeedback'] === "") {
        //   this.checkDidCustomerKnowCouldLeaveFeedback = false;
        // }
        // if (this.experienceStepDataForm.value['customerIssueId'] === "") {
        //   this.checkCustomerIssueId = false;
        // }
    }
    proceedStep3YES() {
        console.log("PROCEED STEP 333 proceedStep3YES");
        const formDataString = JSON.parse(JSON.stringify(this.scoresStepDataForm.value));
        console.log(formDataString);
        // console.log("STEP ENDDD");
        if (this.scoresStepDataForm.value['reliability'] === "") {
            this.checkReliability = false;
        }
        if (this.scoresStepDataForm.value['tidiness'] === "") {
            this.checkTidiness = false;
        }
        if (this.scoresStepDataForm.value['courtsey'] === "") {
            this.checkCourtsey = false;
        }
        if (this.scoresStepDataForm.value['workmanship'] === "") {
            this.checkWorkmanship = false;
        }
        if (this.scoresStepDataForm.value['briefWorkDescription'] === "") {
            this.checkBriefWorkDescription = false;
        }
        if (this.scoresStepDataForm.value['daysToCompleteWork'] === "") {
            this.checkDaysToCompleteWork = false;
        }
        if (this.scoresStepDataForm.value['workComments'] === "") {
            this.checkWorkComments = false;
        }
    }
    proceedStep3NO() {
        console.log("PROCEED STEP 33 proceedStep3NO");
        const formDataString = JSON.parse(JSON.stringify(this.scoresStepDataForm.value));
        console.log(formDataString);
        // console.log("STEP ENDDD");
        if (this.scoresStepDataForm.value['reliability'] === "") {
            this.checkReliability = false;
        }
        if (this.scoresStepDataForm.value['tidiness'] === "") {
            this.checkTidiness = false;
        }
        if (this.scoresStepDataForm.value['courtsey'] === "") {
            this.checkCourtsey = false;
        }
        if (this.scoresStepDataForm.value['workmanship'] === "") {
            this.checkWorkmanship = false;
        }
        if (this.scoresStepDataForm.value['briefWorkDescription'] === "") {
            this.checkBriefWorkDescription = false;
        }
        if (this.scoresStepDataForm.value['daysToCompleteWork'] === "") {
            this.checkDaysToCompleteWork = false;
        }
        if (this.scoresStepDataForm.value['workComments'] === "") {
            this.checkWorkComments = false;
        }
        if (this.scoresStepDataForm.value['workUnderWarranty'] === "") {
            this.checkWorkUnderWarranty = false;
        }
        if (this.scoresStepDataForm.value['contactedTradeAboutComplaint'] === "") {
            this.checkContactedTradeAboutComplaint = false;
        }
    }
    proceedStep4() {
        console.log("PROCEED STEP 444 proceedStep3NO");
        const formDataString = JSON.parse(JSON.stringify(this.detailsStepDataForm.value));
        console.log(formDataString);
        //        console.log("STEP ENDDD");
        if (this.detailsStepDataForm.value['customerName'] === "") {
            this.checkCustomerName = false;
        }
        if (this.detailsStepDataForm.value['customerEmail'] === "") {
            this.checkCustomerEmail = false;
        }
        if (this.detailsStepDataForm.value['customerMobile'] === "") {
            this.checkCustomerMobile = false;
        }
        if (this.detailsStepDataForm.value['customerTelephone'] === "") {
            this.checkCustomerTelephone = false;
        }
        if (this.detailsStepDataForm.value['bestContactTime'] === "") {
            this.checkBestContactTime = false;
        }
        if (this.detailsStepDataForm.value['howDidHearAboutReviewService'] === "") {
            this.checkHowDidHearAboutReviewService = false;
        }
        // console.log("BBBBBBBBBBBBBBBBBBBBBBbbb");
        // console.log(this.locationCtrlPostCode);
        // console.log(this.locationCtrl);
    }
    submitReview() {
        console.log("SUBMIT REVIEWWWWWWWWWWWWWW");
        const detailsStepDataForm = JSON.parse(JSON.stringify(this.detailsStepDataForm.value));
        const scoresStepDataForm = JSON.parse(JSON.stringify(this.scoresStepDataForm.value));
        const experienceStepDataForm = JSON.parse(JSON.stringify(this.experienceStepDataForm.value));
        const futherStepDataForm = JSON.parse(JSON.stringify(this.futherStepDataForm.value));
        // if (this.futherStepDataForm.value['reasonForNotPublishing'] === "") {
        //     this.checkReasonForNotPublishing = false;
        // }
        // if (this.futherStepDataForm.value['canTraderContactForResolution'] === "") {
        //     this.checkCanTraderContactForResolution = false;
        // }
        //   console.log("LOCATIONNNNNNNNn");
        //   console.log(this.locationCtrl);
        //   console.log(this.locationCtrl2);
        //   console.log(this.locationCtrl3);
        console.log(this.locationCtrl['value']);
        console.log(this.locationCtrl2['value']);
        console.log(this.locationCtrl3['value']);
        console.log(detailsStepDataForm);
        console.log(scoresStepDataForm);
        console.log(experienceStepDataForm);
        console.log(futherStepDataForm);
        // console.log(futherStepDataForm['valueOfWork']);
        const trader = +localStorage.getItem('trade');
        const reviewDatas = {};
        reviewDatas['traderId'] = this.trader;
        reviewDatas['recommendTrader'] = experienceStepDataForm['recommendTrader'].toString() === "no" ? false : true;
        reviewDatas['moneyExchanged'] = experienceStepDataForm['moneyExchanged'].toString() === "no" ? false : true;
        reviewDatas['publishFeedback'] = futherStepDataForm['publishFeedback'].toString() === "no" ? false : true;
        reviewDatas['reasonForNotPublishing'] = futherStepDataForm['reasonForNotPublishing'].toString();
        reviewDatas['canTraderContactForResolution'] = futherStepDataForm['canTraderContactForResolution'].toString() === "no" ? false : true;
        reviewDatas['estimateAccuracyId'] = experienceStepDataForm['estimateAccuracyId'].split(",")[1] != undefined ? Number(experienceStepDataForm['estimateAccuracyId'].split(",")[1]) : 0;
        reviewDatas['customerIssueId'] = experienceStepDataForm['customerIssueId'].split(",")[1] != undefined ? Number(experienceStepDataForm['customerIssueId'].split(",")[1]) : 0;
        reviewDatas['reliability'] = Number(scoresStepDataForm['reliability']);
        reviewDatas['tidiness'] = Number(scoresStepDataForm['tidiness']);
        reviewDatas['courtsey'] = Number(scoresStepDataForm['courtsey']);
        reviewDatas['workmanship'] = Number(scoresStepDataForm['workmanship']);
        reviewDatas['chargedCorrectly'] = true;
        reviewDatas['didCustomerKnowCouldLeaveFeedback'] = experienceStepDataForm['didCustomerKnowCouldLeaveFeedback'].toString() === "no" ? false : true;
        reviewDatas['workUnderWarranty'] = scoresStepDataForm['workUnderWarranty'].toString() === "no" ? false : true;
        reviewDatas['contactedTradeAboutComplaint'] = scoresStepDataForm['contactedTradeAboutComplaint'].toString() === "no" ? false : true;
        reviewDatas['tradeCompaintResponse'] = scoresStepDataForm['tradeCompaintResponse'].toString();
        reviewDatas['appointmentMissedDate'] = "2018-09-18T08:56:59.336Z";
        reviewDatas['appointmentsMissed'] = 0;
        reviewDatas['briefWorkDescription'] = scoresStepDataForm['briefWorkDescription'].toString();
        reviewDatas['workCompletedDate'] = scoresStepDataForm['workCompletedDate'];
        reviewDatas['daysToCompleteWork'] = Number(scoresStepDataForm['daysToCompleteWork'].toString());
        reviewDatas['issueComments'] = experienceStepDataForm['issueComments'].toString();
        reviewDatas['workComments'] = scoresStepDataForm['workComments'].toString();
        reviewDatas['title'] = detailsStepDataForm['title'].toString();
        reviewDatas['customerName'] = detailsStepDataForm['customerName'].toString();
        reviewDatas['address1'] = this.locationCtrl['value'].toString();
        reviewDatas['address2'] = this.locationCtrl2['value'].toString();
        reviewDatas['address3'] = this.locationCtrl3['value'].toString();
        reviewDatas['town'] = this.locationCtrlTown.toString();
        reviewDatas['region'] = this.locationCtrlRegion.toString();
        reviewDatas['postalCode'] = this.locationCtrlPostCode.toString();
        reviewDatas['customerEmail'] = detailsStepDataForm['customerEmail'].toString();
        reviewDatas['customerMobile'] = detailsStepDataForm['customerMobile'].toString();
        reviewDatas['customerTelephone'] = detailsStepDataForm['customerTelephone'].toString();
        reviewDatas['customerLocation'] = trader.toString();
        reviewDatas['bestContactTime'] = detailsStepDataForm['bestContactTime'].toString();
        reviewDatas['valueOfWork'] = Number(futherStepDataForm['valueOfWork']);
        reviewDatas['howDidHearAboutReviewService'] = detailsStepDataForm['howDidHearAboutReviewService'].toString();
        reviewDatas['howDidyouFindTraderReviewService'] = detailsStepDataForm['howDidyouFindTraderReviewService'].toString();
        reviewDatas['receiveUpdates'] = detailsStepDataForm['receiveUpdates'].toString() === "no" ? false : true;
        reviewDatas['receiveThirdPartyUpdates'] = detailsStepDataForm['receiveThirdPartyUpdates'].toString() === "no" ? false : true;
        reviewDatas['verificationPreference'] = Number(detailsStepDataForm['verificationPreference']);
        console.log(reviewDatas);
        const tempData = {
            "traderId": this.trader,
            "recommendTrader": experienceStepDataForm['recommendTrader'].toString() === "no" ? false : true,
            "moneyExchanged": experienceStepDataForm['moneyExchanged'].toString() === "no" ? false : true,
            "publishFeedback": futherStepDataForm['publishFeedback'].toString() === "no" ? false : true,
            "reasonForNotPublishing": futherStepDataForm['reasonForNotPublishing'].toString(),
            "canTraderContactForResolution": futherStepDataForm['canTraderContactForResolution'].toString() === "no" ? false : true,
            "estimateAccuracyId": experienceStepDataForm['estimateAccuracyId'].split(",")[1] != undefined ? Number(experienceStepDataForm['estimateAccuracyId'].split(",")[1]) : 0,
            "customerIssueId": experienceStepDataForm['customerIssueId'].split(",")[1] != undefined ? Number(experienceStepDataForm['customerIssueId'].split(",")[1]) : 0,
            "reliability": Number(scoresStepDataForm['reliability']),
            "tidiness": Number(scoresStepDataForm['tidiness']),
            "courtsey": Number(scoresStepDataForm['courtsey']),
            "workmanship": Number(scoresStepDataForm['workmanship']),
            "chargedCorrectly": true,
            "didCustomerKnowCouldLeaveFeedback": experienceStepDataForm['didCustomerKnowCouldLeaveFeedback'].toString() === "no" ? false : true,
            "workUnderWarranty": scoresStepDataForm['workUnderWarranty'].toString() === "no" ? false : true,
            "contactedTradeAboutComplaint": scoresStepDataForm['contactedTradeAboutComplaint'].toString() === "no" ? false : true,
            "tradeCompaintResponse": scoresStepDataForm['tradeCompaintResponse'].toString(),
            "appointmentMissedDate": "2018-09-18T08:56:59.336Z".toString(),
            "appointmentsMissed": 0,
            "briefWorkDescription": scoresStepDataForm['briefWorkDescription'].toString(),
            "workCompletedDate": scoresStepDataForm['workCompletedDate'].toString(),
            "daysToCompleteWork": Number(scoresStepDataForm['daysToCompleteWork'].toString()),
            "issueComments": experienceStepDataForm['issueComments'].toString(),
            "workComments": scoresStepDataForm['workComments'].toString(),
            "title": detailsStepDataForm['title'].toString(),
            "customerName": detailsStepDataForm['customerName'].toString(),
            "address1": this.locationCtrl['value'].toString(),
            "address2": this.locationCtrl2['value'].toString(),
            "address3": this.locationCtrl3['value'].toString(),
            "town": this.locationCtrlTown.toString(),
            "region": this.locationCtrlRegion.toString(),
            "postalCode": this.locationCtrlPostCode.toString(),
            "customerEmail": detailsStepDataForm['customerEmail'].toString(),
            "customerMobile": detailsStepDataForm['customerMobile'].toString(),
            "customerTelephone": detailsStepDataForm['customerTelephone'].toString(),
            "customerLocation": trader.toString(),
            "bestContactTime": detailsStepDataForm['bestContactTime'].toString(),
            "valueOfWork": Number(futherStepDataForm['valueOfWork']),
            "howDidHearAboutReviewService": detailsStepDataForm['howDidHearAboutReviewService'].toString(),
            "howDidyouFindTraderReviewService": detailsStepDataForm['howDidyouFindTraderReviewService'].toString(),
            "receiveUpdates": detailsStepDataForm['receiveUpdates'].toString() === "no" ? false : true,
            "receiveThirdPartyUpdates": detailsStepDataForm['receiveThirdPartyUpdates'].toString() === "no" ? false : true,
            "verificationPreference": Number(detailsStepDataForm['verificationPreference'])
        };
        // const tempData = {
        //       "traderId":7,
        //       "recommendTrader":true,
        //       "moneyExchanged":true,
        //       "publishFeedback":true,
        //       "reasonForNotPublishing":"just saying",
        //       "canTraderContactForResolution":true,
        //       "estimateAccuracyId":4,
        //       "customerIssueId":0,
        //       "reliability":10,
        //       "tidiness":10,
        //       "courtsey":9,
        //       "workmanship":8,
        //       "chargedCorrectly":true,
        //       "didCustomerKnowCouldLeaveFeedback":true,
        //       "workUnderWarranty":true,
        //       "contactedTradeAboutComplaint":true,
        //       "tradeCompaintResponse": "",
        //       "appointmentMissedDate":"2018-09-18T08:56:59.336Z",
        //       "appointmentsMissed":0,
        //       "briefWorkDescription":"new kitchen filled",
        //       "workCompletedDate":"2018-09-19T16:00:00.000Z",
        //       "daysToCompleteWork":23,
        //       "issueComments":"",
        //       "workComments":"good",
        //       "title":"trade",
        //       "customerName":"happy",
        //       "address1":"Av. Infante Dom Henrique A006, 1800-220 Lisboa, Portugal",
        //       "address2":"",
        //       "address3":"",
        //       "town":"Lisboa",
        //       "region":"Lisboa",
        //       "postalCode":"1800-220",
        //       "customerEmail":"sdf@ol.com",
        //       "customerMobile":"+351234644701",
        //       "customerTelephone":"+351234644701",
        //       "customerLocation":"0",
        //       "bestContactTime":"we",
        //       "valueOfWork":65,
        //       "howDidHearAboutReviewService":"Radio",
        //       "howDidyouFindTraderReviewService":"Found the Tradesperson via bemfeito.com",
        //       "receiveUpdates":true,
        //       "receiveThirdPartyUpdates":true,
        //       "verificationPreference":0
        //   }
        this._httpRequest.addReviewTrader(tempData, '/review/public')
            .subscribe(ret => {
            const data = ret;
            console.log("Result response");
            console.log(data);
        });
        this._router.navigate(['/home']);
    }
    proceedStep2NO() {
        console.log("PROCEED STEP 333 proceedStep3YES");
        const formDataString = JSON.parse(JSON.stringify(this.scoresStepDataFormNoCompany.value));
        // console.log(formDataString);
        // console.log("STEP ENDDD");
        if (this.scoresStepDataForm.value['briefWorkDescription'] === "") {
            this.checkBriefWorkDescription = false;
        }
        if (this.scoresStepDataForm.value['daysToCompleteWork'] === "") {
            this.checkDaysToCompleteWork = false;
        }
        if (this.scoresStepDataForm.value['workComments'] === "") {
            this.checkWorkComments = false;
        }
    }
    submitReviewNoCompany() {
        const detailsStepDataForm = JSON.parse(JSON.stringify(this.detailsStepDataForm.value));
        const scoresStepDataFormNoCompany = JSON.parse(JSON.stringify(this.scoresStepDataFormNoCompany.value));
        this._router.navigate(['/home']);
    }
};
__decorate([
    Input("PopulateOnInit"),
    __metadata("design:type", Boolean)
], TraderFeedbackComponent.prototype, "populateOnInit", void 0);
__decorate([
    ViewChild(MatAutocompleteTrigger),
    __metadata("design:type", Object)
], TraderFeedbackComponent.prototype, "trigger", void 0);
__decorate([
    ViewChild("address1"),
    __metadata("design:type", ElementRef)
], TraderFeedbackComponent.prototype, "searchElementRef", void 0);
__decorate([
    ViewChild("address2"),
    __metadata("design:type", ElementRef)
], TraderFeedbackComponent.prototype, "searchElementRef2", void 0);
__decorate([
    ViewChild("address3"),
    __metadata("design:type", ElementRef)
], TraderFeedbackComponent.prototype, "searchElementRef3", void 0);
__decorate([
    ViewChild('#recommendTraderYes'),
    __metadata("design:type", ElementRef)
], TraderFeedbackComponent.prototype, "recommendTraderYes", void 0);
__decorate([
    ViewChild('#recommendTraderNo'),
    __metadata("design:type", ElementRef)
], TraderFeedbackComponent.prototype, "recommendTraderNo", void 0);
TraderFeedbackComponent = __decorate([
    Component({
        selector: 'trader-feedback',
        templateUrl: 'traderFeedback.component.html',
        styleUrls: ['traderFeedback.component.css'],
        animations: [
            trigger('moveLabel', [
                state('moveUp', style({
                    opacity: 0.75,
                    top: '4px',
                    fontSize: '14px'
                })),
                state('moveDown', style({
                    opacity: 1.0,
                    top: '20px',
                    fontSize: '14px'
                })),
                transition('* => moveUp', animate('400ms ease-in-out')),
                transition('* => moveDown', animate('400ms ease-in-out'))
            ]),
            fadeInAnimation,
            slideInFadeInAnimation
        ],
        providers: [SearchService]
    }),
    __metadata("design:paramtypes", [Router,
        FormBuilder,
        ApiRequestsService,
        SearchService,
        MapsAPILoader,
        MapsAPILoader,
        MapsAPILoader,
        NgZone,
        NgZone,
        NgZone])
], TraderFeedbackComponent);
export { TraderFeedbackComponent };
//# sourceMappingURL=traderFeedback.component.js.map