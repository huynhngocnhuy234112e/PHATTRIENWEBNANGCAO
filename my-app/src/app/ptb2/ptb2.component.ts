import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ptb2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ptb2.component.html',
  styleUrls: ['./ptb2.component.css']
})
export class Ptb2Component {
  a_number: number = 5
  b_number: number = 7
  c_number: number = 2
  result: string = "...."
  get_solution() {
    if (this.a_number == 0) {
      if (this.b_number == 0 && this.c_number == 0) {
        this.result = "Tùm lum nghiệm"
      }
      else if (this.b_number == 0 && this.c_number != 0) {
        this.result = "Nẩu có nghiệm"
      }
      else {
        let x = -this.c_number / this.b_number
        this.result = "x=" + x
      }
    }
    else {
      let delta = Math.pow(this.b_number, 2) - 4 * this.a_number * this.c_number
      this.result = "tới đây bạn tự biện luận theo delta"
    }
  }
}
