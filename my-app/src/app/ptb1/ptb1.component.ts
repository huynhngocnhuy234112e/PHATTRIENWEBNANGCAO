import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ptb1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ptb1.component.html',
  styleUrls: ['./ptb1.component.css']
})
export class Ptb1Component {
  solution(a: number, b: number): string {
    if (a == 0 && b == 0) {
      return "Tùm lum nghiệm"
    }
    else if (a == 0 && b != 0) {
      return "Nẩu có nghiệm"
    }
    else {
      let x = -b / a
      return "No x=" + x
    }
  }
  get_solution(a: string, b: string, tdrs: HTMLElement) {
    let a_number = parseFloat(a)
    let b_number = parseFloat(b)
    let r = this.solution(a_number, b_number)
    tdrs.innerHTML = r
  }
  clear_data(a: HTMLInputElement, b: HTMLInputElement, tdr: HTMLElement) {
    a.value = ""
    b.value = ""
    tdr.innerHTML = ""
    a.focus()
  }
}
