import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handle.service';
import { Entry } from '../Entry';
import { Vote } from '../Vote';
import { Observable } from 'rxjs';

@Injectable()
export class SurveyService {

    rootURL = 'http://localhost:8080/api/';
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('VotesService');
      }

    getEntries(): Observable<Entry[]> {
        return this.http.get<Entry[]>(`${this.rootURL}entries`)
    }

    addVote(vote: Vote): Observable<Vote> {
        return this.http.post<Vote>(`${this.rootURL}vote`, vote)
    }

}