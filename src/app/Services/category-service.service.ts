import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-req';
import { Observable } from 'rxjs';
import { Category } from '../Models/category.model';
import { environment } from 'src/environments/environment';
import { EditRequestModel } from '../Models/Edit-request-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  AddCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/categories?addAuth=true`,model);
  }

  getCategories(query?: string, sortBy?:string, sortDirection?:string,
    pageNumber?: number, pageSize?: number
  ): Observable<Category[]> {
    let params = new HttpParams();

    if(query){
      params = params.set('query', query);
    }

    if(sortBy){
      params = params.set('SortBy', sortBy);
    }

    if(sortDirection){
      params = params.set('SortDirection', sortDirection);
    }

    if(pageNumber){
      params = params.set('PageNumber', pageNumber);
    }
    if(pageSize){
      params = params.set('PageSize', pageSize);
    }

    return this.http.get<Category[]>(
      `${environment.apiBaseUrl}/api/categories`, {
        params: params
      }
    );
  }

  GetCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}`
    );
  }

  GetCategoryCount(): Observable<number> {
    return this.http.get<number>(
      `${environment.apiBaseUrl}/api/categories/count`
    );
  }

  UpdateCategory(
    id: string,
    updateCategoryRequest: EditRequestModel
  ): Observable<Category> {
    return this.http.put<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`,
      updateCategoryRequest
    );
  }

  DeleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`
    );
  }
}
