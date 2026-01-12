import { Component } from '@angular/core';

@Component({
  selector: 'app-gpa',
  standalone: false,
  templateUrl: './gpa.html',
  styleUrls: ['./gpa.css'],
})
export class Gpa {
  resultText: string = '';

  get_result(a: string, b: string, c: string): void {
    const qt = parseFloat(a);
    const gk = parseFloat(b);
    const ck = parseFloat(c);
    if (Number.isNaN(qt) || Number.isNaN(gk) || Number.isNaN(ck)) {
      this.resultText = 'vui long nhap so hop le';
      return;
    }
    const gpa = qt * 0.3 + gk * 0.2 + ck * 0.5;
    this.resultText = 'GPA=' + gpa.toFixed(2);
  }

  clear_data(input_a: HTMLInputElement, input_b: HTMLInputElement, input_c: HTMLInputElement): void {
    input_a.value = '';
    input_b.value = '';
    input_c.value = '';
    this.resultText = '';
    setTimeout(() => input_a.focus());
  }
}
