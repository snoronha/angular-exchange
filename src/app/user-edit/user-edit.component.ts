import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../data-model';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit, OnChanges {

    userEditForm: FormGroup;
    @Input() user: User;
    userId: string;

    constructor(private fb: FormBuilder, private api: ApiService, private router: Router,
                private route: ActivatedRoute) {
        this.userId = route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        const that = this;
        // Create the form
        this.userEditForm = this.fb.group({
            email:           new FormControl('', [Validators.required, Validators.email]),
            name:            new FormControl('', []),
            family_name:     new FormControl('', []),
            nickname:        new FormControl('', []),
            sms_number:      new FormControl('', [Validators.required]),
        });
        // Populate the form
        this.api.getUser(this.userId)
            .subscribe(
                response => {
                    that.user = new User(response);
                    this.ngOnChanges();
                },
                error => {
                    console.log('ERROR: ', error);
                    // this.router.navigate(['/home']);
                }
            );
    }

    ngOnChanges() {
        const formModel = this.userEditForm.value;
        this.userEditForm.setValue({
            email:       this.user.email as string,
            name:        this.user.name as string,
            family_name: this.user.family_name as string,
            nickname:    this.user.nickname as string,
            sms_number:  this.user.sms_number as string,
        });
    }

    onSubmit(userData) {
        userData.id = Number(this.userId);
        this.api.updateUser(userData)
            .subscribe(
                response => {
                    console.log('User created sucessfully: ', response);
                    this.router.navigate(['/accounts']);
                },
                createError => {
                    console.log('Error in creating user: ', createError);
                    this.router.navigate(['/home']);
                }
            );
    }

    // No idea why 'any' is needed. Example says `FormControl' should work
    get email()       { return this.userEditForm.get('email'); }
    get name()        { return this.userEditForm.get('name'); }
    get family_name() { return this.userEditForm.get('family_name'); }
    get nickname()    { return this.userEditForm.get('nickname'); }
    get sms_number()  { return this.userEditForm.get('sms_number'); }
}
