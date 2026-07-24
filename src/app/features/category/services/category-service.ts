import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal} from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  //private baseUrl = 'https://localhost:7154';
  private baseUrl = environment.apiUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  addCategory(category: AddCategoryRequest) {
    this.addCategoryStatus.set('loading');
    return this.http.post<void>(`${this.baseUrl}/api/Categories`, category)
      .subscribe({
        next: () => {
          console.log('Category added successfully');
          this.addCategoryStatus.set('success');
        },
        error: (error) => {
          console.error('Error adding category:', error);
          this.addCategoryStatus.set('error');
        }
      }) ;
  } 

  getAllCategories() {
    //return this.http.get(`${this.baseUrl}/api/Categories`); 
    return httpResource<Category[]>(() => `${this.baseUrl}/api/Categories`);  
  }
}


