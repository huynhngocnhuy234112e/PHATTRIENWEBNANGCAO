import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listcustomer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent {
  customers = [
    { "id": "c1", "name": "customer 1", "gender": "male", "image": "c1.png" },
    { "id": "c2", "name": "customer 2", "gender": "male", "image": "c2.png" },
    { "id": "c3", "name": "customer 3", "gender": "female", "image": "c3.png" },
    { "id": "c4", "name": "customer 4", "gender": "male", "image": "c4.png" },
    { "id": "c5", "name": "customer 5", "gender": "female", "image": "c5.png" },
  ]
  constructor(private router: Router, private activeRouter: ActivatedRoute) {

  }
  view_detail(id: any) {
    this.router.navigate(["list-customer", id])
  }
}
