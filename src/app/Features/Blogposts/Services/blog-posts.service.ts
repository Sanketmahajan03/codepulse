import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addBlogPost } from '../Model/add-blog-post.model';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../Model/blog-post.model';
import { UpdateBlogPost } from '../Model/update.blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  constructor(private http: HttpClient) { }

  AddBlogPost(model:addBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts`, model)
  }

  GetAllBlogPost(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);
  }

  GetBlogPostById(id:string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`);
  }

  updateBlogPost(id: string, updatedBlogPOst: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`, updatedBlogPOst);
  }

  deleteBlogPost(id:string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`);
  }
}
