import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError, tap } from 'rxjs';
import { IDongABankData } from './DongABankData';
import { IDongABankItem } from './DongABankItem';

@Injectable({
  providedIn: 'root'
})
export class DongABankService {
  // private _url: string = "/exchange/export"
  // API Dong A Bank da doi sang vikkibank.vn va khong con hoat dong dung endpoint cu
  // Su dung du lieu mau tu assets
  private _url: string = "/assets/dongabank_data.json"
  
  constructor(private _http: HttpClient) { }
  getDongABankData() {
    return this._http.get<any>(this._url).pipe(
      tap(res => console.log('Raw response:', res)),
      map(res => {
        // Neu data tu file json thi khong can parse slice
        return res as IDongABankData;
      }),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
