import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-listproduct1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listproduct1.component.html',
  styleUrls: ['./listproduct1.component.css']
})
export class Listproduct1Component {
  products: any
  constructor(ps: ProductService) {
    this.products = ps.getAllProducts()
  }
}
