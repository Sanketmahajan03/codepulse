import { Component, OnInit } from '@angular/core';
import { BlogPostsService } from '../../Blogposts/Services/blog-posts.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../Blogposts/Model/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  
  constructor( private blogPostService: BlogPostsService){

  }
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.GetAllBlogPost();
  }
}
