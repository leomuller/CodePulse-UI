import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal} from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  //private baseUrl = 'https://localhost:7154';
  private baseUrl = environment.apiUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  updateCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<Category>(() => `${this.baseUrl}/api/Categories/${id()}`);
  } 

  updateCategory(id: string, updateCategoryRequestDto: UpdateCategoryRequest) {
    
    this.updateCategoryStatus.set('loading');

    var obs = this.http.put<void>(`${this.baseUrl}/api/Categories/${id}`, updateCategoryRequestDto)
      .subscribe({
        next: () => {
          console.log('Category updated successfully');
          this.updateCategoryStatus.set('success');
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.updateCategoryStatus.set('error');
        }
      }) ;
  }


  
}


