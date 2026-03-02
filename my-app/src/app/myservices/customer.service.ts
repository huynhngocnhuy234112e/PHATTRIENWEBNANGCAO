import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
customers=[
    {"id":"c1","name":"customer 1","gender":"male","image":"c1.png"},
    {"id":"c2","name":"customer 2","gender":"male","image":"c2.png"},
    {"id":"c3","name":"customer 3","gender":"female","image":"c3.png"},
    {"id":"c4","name":"customer 4","gender":"male","image":"c4.png"},
    {"id":"c5","name":"customer 5","gender":"female","image":"c5.png"},
  ]
  constructor() { }
  public get_all_customers()
  {
    return this.customers
  }
}
