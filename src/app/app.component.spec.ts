import { TestBed, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from './api.service';
import { ApiMockService } from './api-mock.service';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';


describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatMenuModule,
                MatToolbarModule,
                MatIconModule,
                MatInputModule,
                RouterTestingModule,
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {
                    provide: ApiService,
                    useClass: ApiMockService
                },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
