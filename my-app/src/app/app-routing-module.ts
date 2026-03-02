import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { DongABankComponent } from './ex25/dongabank.component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { BooksComponent } from './books/books';
import { BookDetailComponent } from './book-detail/book-detail';

const routes: Routes = [
  { path: '', redirectTo: '/fakeproduct', pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'dongabank', component: DongABankComponent },
  { path: 'fakeproduct', component: FakeProductComponent },
  { path: 'templateform', component: TemplateFormComponent },
  { path: 'books', component: BooksComponent },
  { path: 'ex41book', component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
