import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditRequestModel } from 'src/app/Models/Edit-request-model';
import { Category } from 'src/app/Models/category.model';
import { CategoryServiceService } from 'src/app/Services/category-service.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{


  paramSubscription ?: Subscription
  updateSubscription ?: Subscription
  id : string | null = null;
  category? : Category;
  constructor(private route: ActivatedRoute, private categoryServices: CategoryServiceService, private Route:Router) {

  }

 
 
  ngOnInit(): void {
   this.paramSubscription = this.route.paramMap.subscribe({
      next: (params => {
        this.id = params.get('id');

        if(this.id) {
          this.categoryServices.GetCategoryById(this.id).subscribe({
            next : (responce) =>{
              this.category = responce;
            }
          })
        }
      })
    })

    
  }

  onFormSubmit():void{
    const updateRequestModel :EditRequestModel = {
      Name : this.category?.name ?? '',
      urlHandle : this.category?.urlHandle ?? ''
    };

    if(this.id){
      this.updateSubscription = this.categoryServices.UpdateCategory(this.id, updateRequestModel)
     .subscribe({
      next:(responce) => {
        this.Route.navigateByUrl('/admin/categories');
      }
     });
    }
  }

  OnDelete(): void{
    if(this.id){
      this.categoryServices.DeleteCategory(this.id)
      .subscribe({
        next : (response) =>{
          this.Route.navigateByUrl("/admin/categories");
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }
}
