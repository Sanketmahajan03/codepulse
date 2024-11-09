import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-req';
import { Observable } from 'rxjs';
import { Category } from '../Models/category.model';
import { environment } from 'src/environments/environment';
import { EditRequestModel } from '../Models/Edit-request-model';


@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) {

   }

   AddCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model)
   }

   getCategories() :Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
   }

   GetCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
   }

   UpdateCategory(id: string, updateCategoryRequest: EditRequestModel) : Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`,updateCategoryRequest);
   }

   DeleteCategory(id: string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
   }

}
