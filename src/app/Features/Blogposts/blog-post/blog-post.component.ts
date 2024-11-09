import { Component, OnInit } from '@angular/core';
import { BlogPostsService } from '../Services/blog-posts.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../Model/blog-post.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  constructor(private blogPostServices: BlogPostsService, private router: Router) {

  }
  ngOnInit(): void {
    debugger
   this.blogPosts$ = this.blogPostServices.GetAllBlogPost();
  }
}
