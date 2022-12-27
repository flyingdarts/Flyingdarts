import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../shared/user';
@Injectable({
    providedIn: 'root',
})
export class LobbyApiService {
    // Define API
    apiURL = 'https://run.mocky.io/v3/08d15d00-d62d-4a2d-95b9-9bfff612eee2';
    constructor(private http: HttpClient) { }
    /*========================================
      CRUD Methods for consuming RESTful API
    =========================================*/
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    // HttpClient API get() method => Fetch employees list
    enqueueUser(): Observable<User> {
        return this.http
            .get<User>(this.apiURL + '')
            .pipe(retry(1), catchError(this.handleError));
    }

    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}