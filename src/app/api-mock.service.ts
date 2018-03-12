import { Injectable } from '@angular/core';
import { User } from './data-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiMockService {

    constructor(
    ) {
    }

    public getAllUsers(): Observable<User[]> {
        return Observable.of([
            new User({id: 1, title: 'Read article', complete: false})
        ]);
    }

    public createUser(user: User): Observable<User> {
        return Observable.of(
            new User({id: 1, title: 'Read article', complete: false})
        );
    }

    public getUserById(userId: number): Observable<User> {
        return Observable.of(
            new User({id: 1, title: 'Read article', complete: false})
        );
    }

    public updateUser(user: User): Observable<User> {
        return Observable.of(
            new User({id: 1, title: 'Read article', complete: false})
        );
    }

    public deleteUserById(userId: number): Observable<null> {
        return null;
    }
}
