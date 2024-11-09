import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from 'src/app/Models/add-category-req';
import { CategoryServiceService } from 'src/app/Services/category-service.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?:Subscription;

  constructor(private categoryService: CategoryServiceService,
    private route: Router
  ){
    this.model = {
      name:'',
      urlHandle:''
    };
  }

  onCategorySubmit(){
    this.addCategorySubscription = this.categoryService.AddCategory(this.model).subscribe({
      next : (response) =>{
        this.route.navigateByUrl("admin/categories");
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
