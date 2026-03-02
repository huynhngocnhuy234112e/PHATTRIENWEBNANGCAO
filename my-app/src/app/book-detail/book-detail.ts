import { Component } from '@angular/core';
import { BookAPIService } from '../my-service/book-service';
@Component({
selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetailComponent {
book:any;
errMessage:string=''
constructor(private _service: BookAPIService){
}
searchBook(bookId:string)
{
this._service.getBook(bookId).subscribe({
next:(data)=>{this.book=data},
error:(err)=>{this.errMessage=err}
})
}
}
