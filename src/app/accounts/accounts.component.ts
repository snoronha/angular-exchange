import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {

    nullTabUrl: any; // SafeResourceUrl
    coinbaseTabUrl: any; // SafeResourceUrl
    constructor(@Inject(DOCUMENT) private document: Document, public sanitizer: DomSanitizer) { }

    ngOnInit() {
        // console.log(this.document.location.protocol);
        this.nullTabUrl     = this.sanitizer.bypassSecurityTrustResourceUrl(environment.nullTabUrl);
        this.coinbaseTabUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.coinbaseTabUrl);
    }
}
