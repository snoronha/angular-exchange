import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { User } from './data-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    constructor(private _http: Http) { }

    /*------ Start /users endpoints ------*/
    public createUser(user: User): Observable<any> {
        return this._http
            .post(API_URL + '/api/v1/users/', user)
            .map(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public getUser(userId: string): Observable<any> {
        return this._http
            .get(API_URL + '/api/v1/users/id/' + userId)
            .map(response => {
                return response.json().data;
            })
            .catch(this.handleError);
    }

    public getUserByEmail(email: string): Observable<any> {
        return this._http
            .get(API_URL + '/api/v1/users/email/' + email)
            .map(response => {
                return response.json().data;
            })
            .catch(this.handleError);
    }

    public updateUser(user: User): Observable<any> {
        return this._http
            .put(API_URL + '/api/v1/users/id/' + user.id, user)
            .map(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        return Observable.throw(error);
    }
}
