import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact_name:string="Nguyễn Thị Cẩm";
  contact_email:string="camcam@uel.edu.vn";
  contact_phone:string="0901234567";
  firstName:string="";
  middleName:string="";
  lastName:string="";
  combineFullName():void{
    const parts=[this.firstName,this.middleName,this.lastName]
      .map(s=>s?.trim())
      .filter(s=>s);
    this.contact_name=parts.join(' ');
  }
  sendContact(your_name:string):void
  {
    alert("Bạn "+your_name+" muốn gửi contact");
  }
}
