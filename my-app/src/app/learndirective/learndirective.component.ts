import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learndirective',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learndirective.component.html',
  styleUrls: ['./learndirective.component.css']
})
export class LearndirectiveComponent {
  show_view: number = 1
  changeView() {
    if (this.show_view == 1)
      this.show_view = 2
    else
      this.show_view = 1
  }

  provinces = ["Hà Nội", "Huế", "Đà Nẵng", "HCM", "Cần Thơ"]
  products = [{ "id": "p1", "name": "coca", "price": 100 },
  { "id": "p2", "name": "Pepsi", "price": 80 },
  { "id": "p3", "name": "sting", "price": 120 },
  ]
}
