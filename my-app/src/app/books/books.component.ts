import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookAPIService } from '../myservices/book-api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  books: any;
  errMessage: string = ''
  constructor(private _service: BookAPIService, private router: Router, private activeRouter: ActivatedRoute) {
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data },
      error: (err) => { this.errMessage = err }
    })
  }
  show_detail(id: any) {
    this.router.navigate(["ex41", id])
  }
}
