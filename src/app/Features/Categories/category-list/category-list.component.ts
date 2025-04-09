import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { Category } from 'src/app/Models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 3;
  constructor(private categoryService: CategoryServiceService){

  }
  ngOnInit(): void {
    this.categoryService.GetCategoryCount()
    .subscribe({
      next: (value) =>{
        this.totalCount = value;
        this.list = new Array(Math.ceil(this.totalCount/this.pageSize));

        this.categories$ = this.categoryService.getCategories(
          undefined, 
          undefined, 
          undefined, 
          this.pageNumber,
          this.pageSize, 
        );
      }
    })


  //   this.categoryService.getCategories()
  //   .subscribe({next :(responce) =>{
  //     this.categories = responce;
  //   }
  // })
  }

  OnSearch(queryParam: string): void{
    this.categories$ =  this.categoryService.getCategories(queryParam);
    
  }

  Sort(sortBy: string, sortDirection:string): void{
   this.categories$ = this.categoryService.getCategories(undefined, sortBy, sortDirection)
    
  }

  GetPage(pageNumber: number): void{
    this.pageNumber = pageNumber;
    this.categories$ = this.categoryService.getCategories(
      undefined, 
      undefined, 
      undefined, 
      this.pageNumber, 
      this.pageSize)
  }

  OnNextPage(){
    if(this.pageNumber + 1 > this.list.length){
      return;
    }
    this.pageNumber++;
    this.categories$ = this.categoryService.getCategories(
      undefined, 
      undefined, 
      undefined, 
      this.pageNumber, 
      this.pageSize)
  }

  OnPreviousPage(){
    if(this.pageNumber -1 < 1){
      return;
    }
    this.pageNumber--;
    this.categories$ = this.categoryService.getCategories(
      undefined, 
      undefined, 
      undefined, 
      this.pageNumber, 
      this.pageSize)
  }

}
