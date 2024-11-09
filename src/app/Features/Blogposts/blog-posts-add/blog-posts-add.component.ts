import { Component, OnDestroy, OnInit } from '@angular/core';
import { addBlogPost } from '../Model/add-blog-post.model';
import { BlogPostsService } from '../Services/blog-posts.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { Category } from 'src/app/Models/category.model';

@Component({
  selector: 'app-blog-posts-add',
  templateUrl: './blog-posts-add.component.html',
  styleUrls: ['./blog-posts-add.component.css']
})
export class BlogPostsAddComponent implements OnInit, OnDestroy {

  model : addBlogPost
  private AddBlogPostsSubscription ?: Subscription;
  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostsService, 
    private router: Router, 
    private CategoriesServices: CategoryServiceService) {

    this.model = {
      title : '',
      shortDescription: '',
      content: '',
      publishedDate: new Date(),
      author: '',
      featuredUrlImage:'',
      isVisible: true,
      urlHandle:'',
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.CategoriesServices.getCategories();
  }
 
  OnFormSubmit(): void {
    console.log(this.model);
   this.AddBlogPostsSubscription = this.blogPostService.AddBlogPost(this.model)
    .subscribe({
      next: (responce =>{
        this.router.navigateByUrl("admin/blogposts");
      })
    })
    
  }
  ngOnDestroy(): void {
    this.AddBlogPostsSubscription?.unsubscribe;
  }
}
