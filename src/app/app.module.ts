import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/oldComponents/login/login.component';
import { SignupComponent } from './components/oldComponents/signup/signup.component';
import { DashboardComponent } from './components/oldComponents/dashbord/dashboard.component';
import { ForgotpassComponent } from './components/oldComponents/forgotpass/forgotpass.component';
import { ProfileComponent } from './components/profile/profile.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material.module";
import { NgToastModule } from 'ng-angular-popup'
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import { NewloginComponent } from './components/newlogin/newlogin.component';
import { NewsignupComponent } from './components/newsignup/newsignup.component';
import { NewforgotpassComponent } from './components/newforgotpass/newforgotpass.component';
import { GhostforgotComponent } from './components/oldComponents/ghostforgot/ghostforgot.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { NewdashboardComponent } from './components/newdashboard/newdashboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { EditDataComponent } from './components/edit-data/edit-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotpassComponent,
    ProfileComponent,
    NewloginComponent,
    NewsignupComponent,
    NewforgotpassComponent,
    NewdashboardComponent,
    EditDataComponent,

  ],
    imports: [
        NgToastModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyDhaaJX13c_xgv2nWndko61dJK3iA8InYI",
            authDomain: "angular-firebase-app-beb6e.firebaseapp.com",
            projectId: "angular-firebase-app-beb6e",
            storageBucket: "angular-firebase-app-beb6e.appspot.com",
            messagingSenderId: "331595499734",
            appId: "1:331595499734:web:1bdf8908a5fa0c9b1f2177",
            measurementId: "G-BSTN1NEL05",
        }),

        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,

        HeaderComponent,
        NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
        GhostforgotComponent,
        MatTableModule,
        MatSortModule,
        FormsModule


    ],
  providers: [],
  exports: [
    NgxSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
