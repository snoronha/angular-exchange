import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // NgModel lives here
import { HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { Ng2HighchartsModule } from 'ng2-highcharts';
import { AgGridModule } from "ag-grid-angular/main";

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { User } from './data-model';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserEditComponent } from './user-edit/user-edit.component';

declare let require: any;
declare let System: any;

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatOptionModule,
        MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule,  MatTabsModule,  MatTableModule,
        MatToolbarModule,
        Ng2HighchartsModule,
        AgGridModule.withComponents([]),
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AccountsComponent,
        UserEditComponent,
    ],
    providers: [
        ApiService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
