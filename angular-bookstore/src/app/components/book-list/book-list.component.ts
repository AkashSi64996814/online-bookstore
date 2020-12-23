import { Component, OnInit } from '@angular/core';
import {Book} from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[]
  currentCategoryId: number;
  searchMode: boolean;
  
  constructor(private _bookServive : BookService, private _activatedRoute : ActivatedRoute) { }

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
    console.log("Currency Id :",this.currentCategoryId)
    this._bookServive.getBooks(this.currentCategoryId).subscribe(
      data => {
        this.books = data
      }
    )
  }

  handleSearchBooks(){
   const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookServive.searchBooks(keyword).subscribe(
      data => {
        this.books = data;
      }
    )
  }

}
