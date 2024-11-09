import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './Features/Categories/category-list/category-list.component';
import { AddCategoriesComponent } from './Features/Categories/add-categories/add-categories.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './Features/Categories/edit-category/edit-category.component';
import { BlogPostComponent } from './Features/Blogposts/blog-post/blog-post.component';
import { BlogPostsAddComponent } from './Features/Blogposts/blog-posts-add/blog-posts-add.component';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { EditBlogPostComponent } from './Features/Blogposts/edit-blog-post/edit-blog-post.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoriesComponent,
    EditCategoryComponent,
    BlogPostComponent,
    BlogPostsAddComponent,
    EditBlogPostComponent,
    ImageSelectorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownComponent,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
