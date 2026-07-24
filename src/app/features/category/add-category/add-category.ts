import { Component, effect, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  //1 import reactiveforms module in app.module.ts
//2) create a form group and form control in the component class

private categoryService = inject(CategoryService);
private router = inject(Router);

  constructor() {
     effect(() => {
        if(this.categoryService.addCategoryStatus() === 'success') {
          console.log('Category added successfully');
          // redirect to category list page
          this.router.navigate(['/admin/categories']);
          this.categoryService.addCategoryStatus.set('idle');

        } else if(this.categoryService.addCategoryStatus() === 'error') {
          console.log('Error adding category');
        } 
    })
  }

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(20)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(10)]})
  })

  get nameFormControl() {
    return this.addCategoryFormGroup.controls.name as FormControl;
  } 

  get urlHandleFormControl() {
    return this.addCategoryFormGroup.controls.urlHandle as FormControl;
  } 
  
  onSubmit() {
    
    console.log(this.addCategoryFormGroup.getRawValue());

    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandle: addCategoryFormValue.urlHandle
    };

    this.categoryService.addCategory(addCategoryRequestDto);

   

  }
}
