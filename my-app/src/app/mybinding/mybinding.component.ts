import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mybinding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mybinding.component.html',
  styleUrls: ['./mybinding.component.css']
})
export class MybindingComponent {
  public full_name: string = "Tèo"
  public email: string = "teo@gmail.com"
  public is_readonly: boolean = true
  public personal_style = {
    color: "red",
    fontSize: "20pt",
    fontStyle: "italic"
  }
  get_fullname(
    fn: string,
    mn: string,
    ln: string,
    tdfn: HTMLElement) {
    alert("Vinh mua máy mới")
    tdfn.innerHTML = fn + " " + mn + " " + ln
  }

}
