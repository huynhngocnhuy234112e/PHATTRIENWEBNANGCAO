import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { MyComponent } from './mycomponent/mycomponent';
import { Mybinding } from './mybinding/mybinding';
import { Ptb1 } from './ptb1/ptb1';
import { Gpa } from './gpa/gpa';
import { Ptb2 } from './ptb2/ptb2';
import { Ex10 } from './ex10/ex10';
import { Ex19 } from './ex19/ex19';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DongABankComponent } from './ex25/dongabank.component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { BooksComponent } from './books/books';
  import { BookDetailComponent } from './book-detail/book-detail';

@NgModule({
  declarations: [
    App,
    About,
    Contact,
    MyComponent,
    Mybinding,
    Ptb1,
    Gpa,
    Ptb2,
    Ex10,
    Ex19,
    DongABankComponent,
    FakeProductComponent,
    TemplateFormComponent,
    BooksComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
