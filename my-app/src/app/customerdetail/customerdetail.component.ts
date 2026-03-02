import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customerdetail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent {
  customers = [
    { "id": "c1", "name": "customer 1", "gender": "male", "image": "c1.png" },
    { "id": "c2", "name": "customer 2", "gender": "male", "image": "c2.png" },
    { "id": "c3", "name": "customer 3", "gender": "female", "image": "c3.png" },
    { "id": "c4", "name": "customer 4", "gender": "male", "image": "c4.png" },
    { "id": "c5", "name": "customer 5", "gender": "female", "image": "c5.png" },
  ]
  selected_customer: any
  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    this.activeRouter.paramMap.subscribe(
      (param) => {
        let id = param.get("id")
        if (id != null)//lấy được id từ routing nào đó gửi qua
        {
          //sau đó sẽ truy vấn id này trong dataset của mình:
          this.selected_customer = this.customers.find(c => c.id == id)
        }
      }
    )
  }
  go_back() {
    this.router.navigate(["list-customer"])
  }
}
