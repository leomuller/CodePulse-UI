import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private categoryService = inject(CategoryService);
  private getlAllCategoriesRef = this.categoryService.getAllCategories();

  isLoading = this.getlAllCategoriesRef.isLoading;
  isError = this.getlAllCategoriesRef.error;
  value = this.getlAllCategoriesRef.value;


}
