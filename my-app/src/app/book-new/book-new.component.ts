import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../classes/ibook';
import { BookAPIService } from '../myservices/book-api.service';

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent {
  book = new Book();
  books: any
  errMessage: string = ''
  constructor(private _service: BookAPIService) {
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data },
      error: (err) => { this.errMessage = err }
    })
  }
  postBook() {
    alert("Book name=" + this.book.BookName)
    this._service.postBook(this.book).subscribe({
      next: (data) => { this.books = data },
      error: (err) => { this.errMessage = err }
    })
  }
}
