import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostsService } from '../../Blogposts/Services/blog-posts.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../Blogposts/Model/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{

  url: string | null = null;
  blogPost$? : Observable<BlogPost>;
  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostsService
  ){
    
  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) =>{
       this.url = params.get('url');
      }
    });

    //featch blog details by url
    if(this.url){
     this.blogPost$ = this.blogPostService.GetBlogPostByUrlHandle(this.url)
    }
  }

}
