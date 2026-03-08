import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../models/fashion.model';

@Injectable({ providedIn: 'root' })
export class FashionApiService {

    constructor(private _http: HttpClient) { }

    private get opts(): Object {
        return {
            headers: new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8'),
            responseType: 'text'
        };
    }

    private get jsonOpts(): Object {
        return {
            headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8'),
            responseType: 'text'
        };
    }

    getFashions(): Observable<Fashion[]> {
        return this._http.get<any>('/fashions', this.opts).pipe(
            map(res => JSON.parse(res) as Fashion[]),
            retry(1), catchError(this.handleError));
    }

    getFashionsByStyle(style: string): Observable<Fashion[]> {
        return this._http.get<any>(`/fashions/style/${encodeURIComponent(style)}`, this.opts).pipe(
            map(res => JSON.parse(res) as Fashion[]),
            retry(1), catchError(this.handleError));
    }

    getFashion(id: string): Observable<Fashion> {
        return this._http.get<any>(`/fashions/${id}`, this.opts).pipe(
            map(res => JSON.parse(res) as Fashion),
            retry(1), catchError(this.handleError));
    }

    postFashion(f: Fashion): Observable<Fashion> {
        return this._http.post<any>('/fashions', JSON.stringify(f), this.jsonOpts).pipe(
            map(res => JSON.parse(res) as Fashion),
            retry(1), catchError(this.handleError));
    }

    putFashion(id: string, f: Fashion): Observable<Fashion> {
        return this._http.put<any>(`/fashions/${id}`, JSON.stringify(f), this.jsonOpts).pipe(
            map(res => JSON.parse(res) as Fashion),
            retry(1), catchError(this.handleError));
    }

    deleteFashion(id: string): Observable<any> {
        return this._http.delete<any>(`/fashions/${id}`, this.opts).pipe(
            map(res => JSON.parse(res)),
            retry(1), catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(() => new Error(error.message));
    }
}
