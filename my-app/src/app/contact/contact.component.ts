import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact_name: string = "Nguyễn Thị Long Lanh"
  contact_email: string = "longlanh@uel.edu.vn"
  contact_phone: string = "0932487235"
  products = ["coca", "pepsi", "sting"]
  products2 = [{ "id": 1, "name": "coca", "price": 100 },
  { "id": 2, "name": "pepsi", "price": 150 },
  { "id": 3, "name": "sting", "price": 70 },
  ]
  sendContact(your_name: string): void {
    alert("Bạn [" + your_name + "] muốn gửi contact")
  }
  xulycong(a: string, b: string, cont: HTMLElement): void {
    cont.innerHTML = (parseFloat(a) + parseFloat(b)) + ""
  }
}
