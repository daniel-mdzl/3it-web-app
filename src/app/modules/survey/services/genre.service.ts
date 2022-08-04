import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handle.service';
import { Genre } from '../Genre';
import { Observable } from 'rxjs';

@Injectable()
export class GenreService {

    rootURL = 'http://localhost:8080/api/';
    private handleError: HandleError;

    constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('GenresService');
      }

    getGenres(): Observable<Genre[]> {
        return this.http.get<Genre[]>(`${this.rootURL}genres`)
    }

}