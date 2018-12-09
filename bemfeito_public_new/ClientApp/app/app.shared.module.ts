import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  } from '@angular/material';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import { TranslationEmitterService } from './services/translation.emitter.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/shared/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { MembersComponent } from './components/members/members.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

import { HeroComponent } from './components/shared/hero/hero.component';
import { SearchTradeComponent } from './components/shared/searchTrade/searchTrade.component';
import { SearchResultComponent } from './components/shared/searchResult/searchResult.component';
import { CategoryHeroComponent } from './components/shared/categoryHero/categoryHero.component';
import { LanguageDropDownComponent } from './components/shared/languageDropDown/languageDropDown.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

import { HighlightPipe } from './utils/highlight.pipe';

import { environment } from './environment/environment';

import { Globals } from './globals/globals';


//ricardo
import { SignupTraderComponent } from './components/signuptrader/signuptrader.component';
import { TraderSignupSuccessComponent } from './components/dialogs/tradersignupsuccess/tradersignupsuccess.component';
import { ApiRequestsService } from './services/api-requests.service';
import { MapComponent } from './components/shared/map/map.component'; 
import { TraderProfileComponent } from './components/traderProfile/traderProfile.component';
import { TraderFeedbackComponent } from './components/traderFeedback/traderFeedback.component';


import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        MembersComponent,
        ProfileComponent,
        SearchComponent,
        HeroComponent,
        SearchTradeComponent,
        SearchResultComponent,
        CategoryHeroComponent,
        LanguageDropDownComponent,
        FooterComponent,
        HighlightPipe,
        SignupTraderComponent, //ricardo
        TraderSignupSuccessComponent,
        MapComponent, // ricardo
        TraderProfileComponent, // ricardo
        TraderFeedbackComponent,
        LoadingComponent 
    ],
    imports: [
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        HttpModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatInputModule,
        MatSlideToggleModule,
        GooglePlaceModule,
        AgmCoreModule.forRoot({
            libraries: ["places"],
            apiKey: environment.googlePlacesKey
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            // {
            //     path: "home",
            //     loadChildren: "./components/home/home.module#HomeModule"
            // },
            { path: 'members', component: MembersComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'search', component: SearchComponent },
            { path: 'loading', component: LoadingComponent },
            // { path: '**', redirectTo: 'home' },
            { path: 'signup', children: [ 
                {path: '',  redirectTo: 'home', pathMatch: 'full'}, 
                {path: 'trader',  component: SignupTraderComponent},
                {path: '**',  redirectTo: 'home', pathMatch: 'full'}
                ]
            }, 
            { path: 'traderProfile/:id', component: TraderProfileComponent }, // ricardo
            { path: 'traderFeedback', component: TraderFeedbackComponent }
        ])
    ],
    providers: [
        TranslationEmitterService,
        Globals,
        ApiRequestsService //ricardo
    ],
    entryComponents: [
        TraderSignupSuccessComponent
    ]
})
export class AppModuleShared {
}
