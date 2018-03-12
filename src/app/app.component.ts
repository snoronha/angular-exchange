import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './data-model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})

export class AppComponent implements OnInit {

    users: User[] = [];

    constructor(public  _router: Router) { }

    public ngOnInit() { }

    goto(url: string) {
        this._router.navigate([url]);
    }
}
