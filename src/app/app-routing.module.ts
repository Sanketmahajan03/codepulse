import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Categories/category-list/category-list.component';
import { AddCategoriesComponent } from './Features/Categories/add-categories/add-categories.component';
import { EditCategoryComponent } from './Features/Categories/edit-category/edit-category.component';
import { BlogPostComponent } from './Features/Blogposts/blog-post/blog-post.component';
import { BlogPostsAddComponent } from './Features/Blogposts/blog-posts-add/blog-posts-add.component';
import { EditBlogPostComponent } from './Features/Blogposts/edit-blog-post/edit-blog-post.component';
import { HomeComponent } from './Features/Public/home/home.component';
import { BlogDetailsComponent } from './Features/Public/blog-details/blog-details.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { authGuard } from './Features/Auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategoriesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts',
    component: BlogPostComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts/add',
    component: BlogPostsAddComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogPostComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
