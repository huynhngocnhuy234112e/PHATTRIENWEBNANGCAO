import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './classes/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  product_url="./assets/dataset/products.json"
  constructor(private _http:HttpClient) 
  { 
    
  }
  get_all_products():Observable<IProduct[]>
  {
    return this._http.get<IProduct[]>(this.product_url)
  }
}
