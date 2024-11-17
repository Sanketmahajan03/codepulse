import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostsService } from '../Services/blog-posts.service';
import { BlogPost } from '../Model/blog-post.model';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { Category } from 'src/app/Models/category.model';
import { UpdateBlogPost } from '../Model/update.blogpost.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';


@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css']
})
export class EditBlogPostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;
  
  routeSubscription?:Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostServices: BlogPostsService,
    private blogCategories : CategoryServiceService,
    private router: Router,
    private imageService: ImageService
  ) {

  }
  ngOnInit(): void {

   this.categories$ = this.blogCategories.getCategories();
   this.routeSubscription = this.route.paramMap.subscribe({
      next: (paramMap) => {
        this.id = paramMap.get('id');
        // get blogPost Data

        if(this.id){
          var deleteBlogPostSubscription = this.blogPostServices.GetBlogPostById(this.id).subscribe( {
            next: (responce) =>{
              this.model = responce;
              this.selectedCategories = responce.categories.map(x => x.id);
            }
          })
        }

       this.imageSelectSubscription =  this.imageService.onSelectImage()
        .subscribe({
          next: (responce) =>{
            if(this.model) {
              this.model.featuredUrlImage = responce.url;
              this.isImageSelectorVisible = false;
            }
          }
        })

      }
    })
  }
  OnFormSubmit() {
    if(this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content : this.model.content,
        shortDescription : this.model.shortDescription,
        featuredUrlImage : this.model.featuredUrlImage,
        isVisible : this.model.isVisible,
        publishedDate : this.model.publishedDate,
        title : this.model.title,
        urlHandle : this.model.urlHandle,
        categories : this.selectedCategories ?? []
      };

      var updateBlogPostSubscription = this.blogPostServices.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next:(Response) =>{
          this.router.navigateByUrl("/admin/blogposts");

        }
      })
    }
  }

  OnDelete(){
    if(this.id) {
      this.blogPostServices.deleteBlogPost(this.id)
      .subscribe({
        next : (Response => {
          this.router.navigateByUrl("admin/blogposts");
        }) 
      })
    }
  }

  openImageSelector(): void {
  this.isImageSelectorVisible = true;
  }

  closedImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
