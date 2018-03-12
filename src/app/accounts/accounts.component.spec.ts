import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { ApiService } from '../api.service';
import {
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
} from '@angular/material';
import { AccountsComponent } from './accounts.component';

describe('AccountsComponent', () => {
    let component: AccountsComponent;
    let fixture: ComponentFixture<AccountsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatProgressSpinnerModule,
                MatSnackBarModule,
                MatTableModule,
            ],
            declarations: [
                AccountsComponent
            ],
            providers: [
                ApiService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
