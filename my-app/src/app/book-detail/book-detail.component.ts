import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAPIService } from '../myservices/book-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  book: any;
  errMessage: string = ''
  constructor(private _service: BookAPIService, private router: Router, private activeRouter: ActivatedRoute) {
    activeRouter.paramMap.subscribe((params) => {
      let bookId = params.get("id")
      if (bookId != null)
        this.searchBook(bookId)
    })
  }
  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => { this.book = data },
      error: (err) => { this.errMessage = err }
    })
  }
}
