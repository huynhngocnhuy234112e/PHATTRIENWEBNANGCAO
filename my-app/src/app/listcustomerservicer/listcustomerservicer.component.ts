import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../myservices/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listcustomerservicer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listcustomerservicer.component.html',
  styleUrls: ['./listcustomerservicer.component.css']
})
export class ListcustomerservicerComponent {
  customers: any
  constructor(private cs: CustomerService, private router: Router, private activeRouter: ActivatedRoute) {
    this.customers = cs.get_all_customers()
  }
  view_detail(id: any) {
    this.router.navigate(["list-customer-service", id])
  }
}
