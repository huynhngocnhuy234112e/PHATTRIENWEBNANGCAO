import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-listproduct2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listproduct2.component.html',
  styleUrls: ['./listproduct2.component.css']
})
export class Listproduct2Component {
  products: any
  constructor(ps: ProductService) {
    this.products = ps.getAllProducts()
  }
}
