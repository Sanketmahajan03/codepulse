import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Categories/category-list/category-list.component';
import { AddCategoriesComponent } from './Features/Categories/add-categories/add-categories.component';
import { EditCategoryComponent } from './Features/Categories/edit-category/edit-category.component';
import { BlogPostComponent } from './Features/Blogposts/blog-post/blog-post.component';
import { BlogPostsAddComponent } from './Features/Blogposts/blog-posts-add/blog-posts-add.component';
import { EditBlogPostComponent } from './Features/Blogposts/edit-blog-post/edit-blog-post.component';


const routes: Routes = [
  {
    path:"admin/categories",
    component:CategoryListComponent
  },
  {
    path:"admin/categories/add",
    component:AddCategoriesComponent
  }
  ,
  {
    path:"admin/categories/:id",
    component:EditCategoryComponent
  },
  {
    path:"admin/blogposts",
    component:BlogPostComponent
  },
  {
    path:"admin/blogposts/add",
    component:BlogPostsAddComponent
  },
  {
    path:"admin/blogposts/:id",
    component:EditBlogPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
