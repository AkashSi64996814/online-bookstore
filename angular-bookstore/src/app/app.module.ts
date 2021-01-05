import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {BookService} from './services/book.service';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {JwPaginationModule} from 'jw-angular-pagination';
import {NgbPaginationModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import {NgxSpinnerModule} from 'ngx-spinner';

const routes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent,
    CartStatusComponent,
  ],
  imports: [
    BrowserModule,
    JwPaginationModule,
    HttpClientModule,
    NgbPaginationModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
