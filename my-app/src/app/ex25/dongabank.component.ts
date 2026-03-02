import { Component } from '@angular/core';
import { DongABankService } from './dong-abank.service';

@Component({
  selector: 'app-dong-abank',
  standalone: false,
  templateUrl: './dong-abank.component.html',
  styleUrls: ['./dong-abank.component.css']
})
export class DongABankComponent {
  data: any
  errMessage: string = ''
  constructor(_service: DongABankService) {
    _service.getDongABankData().subscribe({
      next: (data) => {
        this.data = data
        console.log('Parsed data:', data)
      },
      error: (err) => {
        this.errMessage = err
        console.error('Error fetching data:', err)
      }
    })
  }
}
