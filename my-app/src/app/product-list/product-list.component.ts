import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errMessage: string = '';
  addedMessage: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: (data) => { this.products = data; },
      error: (err) => { this.errMessage = 'Error loading products: ' + err.message; }
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product).subscribe({
      next: (res) => {
        this.addedMessage = `✅ "${product.name}" đã được thêm vào giỏ hàng!`;
        setTimeout(() => this.addedMessage = '', 3000);
      },
      error: (err) => {
        this.errMessage = 'Error adding to cart: ' + err.message;
      }
    });
  }
}
