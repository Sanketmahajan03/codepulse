import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { Category } from 'src/app/Models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories?: Category[];
  constructor(private categoryService: CategoryServiceService){

  }
  ngOnInit(): void {
    debugger;
    this.categoryService.getCategories()
    .subscribe({next :(responce) =>{
      this.categories = responce;
    }
  })
  }

}
