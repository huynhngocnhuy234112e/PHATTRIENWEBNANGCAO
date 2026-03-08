import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  selectedIds: Set<string> = new Set();
  errMessage: string = '';
  updateMessage: string = '';

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data) => { this.cartItems = data; },
      error: (err) => { this.errMessage = 'Error loading cart: ' + err.message; }
    });
  }

  // Tổng tiền của 1 item
  itemTotal(item: any): number {
    return item.price * item.qty;
  }

  // Tổng tiền toàn bộ giỏ hàng
  grandTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  toggleSelected(id: string): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  // Cập nhật số lượng trong giỏ hàng
  updateCart(): void {
    const updates = this.cartItems.map(item => ({
      _id: item._id.toString(),
      qty: item.qty
    }));
    this.cartService.updateCart(updates).subscribe({
      next: (data) => {
        this.cartItems = data;
        this.updateMessage = '✅ Giỏ hàng đã được cập nhật!';
        setTimeout(() => this.updateMessage = '', 3000);
      },
      error: (err) => { this.errMessage = err.message; }
    });
  }

  // Xóa các item đã chọn (bằng checkbox)
  removeSelected(): void {
    const ids = Array.from(this.selectedIds);
    if (ids.length === 0) {
      alert('Vui lòng chọn sản phẩm cần xóa!');
      return;
    }
    ids.forEach(id => {
      this.cartService.removeFromCart(id).subscribe({
        next: (data) => {
          this.cartItems = data;
          this.selectedIds.clear();
        },
        error: (err) => { this.errMessage = err.message; }
      });
    });
  }

  continueShopping(): void {
    this.router.navigate(['/ex63']);
  }
}
