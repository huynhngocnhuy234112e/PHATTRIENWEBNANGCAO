import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHttpService } from '../product-http.service';

@Component({
  selector: 'app-listproduct3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listproduct3.component.html',
  styleUrls: ['./listproduct3.component.css']
})
export class Listproduct3Component {
  products: any
  constructor(private pshttp: ProductHttpService) {
    this.pshttp.get_all_products().subscribe({
      next: (data) => { this.products = data }
    })
  }
}
