import { HttpClient, HttpErrorResponse, HttpHeaders } from
'@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IFakeProduct } from '../classes/iFakeProduct';
@Injectable({
providedIn: 'root'
})
export class FakeProductService {
  // private _url:string="/products"
  private _url:string="https://fakestoreapi.com/products"
constructor(private _http: HttpClient) { }
getFakeProductData():Observable<IFakeProduct[]> {
    return this._http.get<IFakeProduct[]>(this._url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
handleError(error:HttpErrorResponse){
return throwError(()=>new Error(error.message))
}
}
