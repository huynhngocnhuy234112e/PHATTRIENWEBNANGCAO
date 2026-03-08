import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Lấy toàn bộ danh sách sản phẩm
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('/products');
  }

  // Thêm sản phẩm vào giỏ hàng (Post lên session)
  addToCart(product: any): Observable<any> {
    return this.http.post<any>('/cart/add', product, { withCredentials: true });
  }

  // Xem giỏ hàng
  getCart(): Observable<any[]> {
    return this.http.get<any[]>('/cart', { withCredentials: true });
  }

  // Cập nhật số lượng sản phẩm trong giỏ
  updateCart(items: { _id: string, qty: number }[]): Observable<any[]> {
    return this.http.put<any[]>('/cart/update', items, { withCredentials: true });
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: string): Observable<any[]> {
    return this.http.delete<any[]>(`/cart/remove/${productId}`, { withCredentials: true });
  }
}
