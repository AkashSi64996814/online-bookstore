import { Component, OnInit } from '@angular/core';
import {Book} from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
// import {JwPaginationComponent} from 'jw-angular-pagination';


@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  //New properties for server side pagination
  currentPage: number = 1;
  pageSize: number = 1;
  totalRecords: number = 0;
  previousCategoryId: number = 1;
  
  
  constructor(private _bookServive : BookService, 
              private _activatedRoute : ActivatedRoute,
              _config: NgbPaginationConfig, private _cartService: CartService ) { 
                _config.maxSize = 3;
                _config.boundaryLinks = true;
              }

  ngOnInit(){ 
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchBooks();
    }else{
      this.handleListBooks();
    }
  }

  handleListBooks(){

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){
     this.currentCategoryId =+ this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId = 1;
    }

    //Setting up the current page to 1.
    //If user navigates to a different category.
    if(this.previousCategoryId != this.currentCategoryId){
      this.currentPage = 1;
    }
    console.log("Currency Id :",this.currentCategoryId)
    this._bookServive.getBooks(this.currentCategoryId, this.currentPage -1, this.pageSize).subscribe(
      this.processPaginate()
    )
  }

  handleSearchBooks(){
   const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookServive.searchBooks(keyword, this.currentPage -1, this.pageSize).subscribe(
      this.processPaginate()
    )
  }

  updatePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processPaginate(){
    return data => {
      console.log("Overall data is :",data)
      this.books = data._embedded.books;
      // Page number starts from index 1.
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(book: Book){
    console.log(`Book name is :${book.name} and price is : ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

}
