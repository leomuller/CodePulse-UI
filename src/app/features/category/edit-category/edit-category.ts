import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule ],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {

  constructor() {
    effect(() => {
      if(this.categoryService.updateCategoryStatus() === 'success') {
        console.log('Category updated successfully');
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      } 
      else if(this.categoryService.updateCategoryStatus() === 'error') {
        console.log('Error updating category');
      }
    })   
  }


  id = input<string>();
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  categoryResourceRef = this.categoryService.getCategoryById(this.id);
  categoryResponse = this.categoryResourceRef.value;


  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(20)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(10)]})
  })

  get nameFormControl() {
    return this.editCategoryFormGroup.controls.name as FormControl;
  } 

  get urlHandleFormControl() {
    return this.editCategoryFormGroup.controls.urlHandle as FormControl;
  } 

  effectRef = effect(() => {

    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '');

    // if(this.categoryResponse()) {
    //   this.editCategoryFormGroup.patchValue({   

    //     name: this.categoryResponse()?.name,
    //     urlHandle: this.categoryResponse()?.urlHandle
    //   })
    // }
  })
  

  onSubmit() {

    const id = this.id();
    if(this.editCategoryFormGroup.valid == false || id == undefined) {
      return;
    }

    const formRawValue = this.editCategoryFormGroup.getRawValue();

    const updateCategoryRequestDto: UpdateCategoryRequest = {
      name: formRawValue.name,
      urlHandle: formRawValue.urlHandle
    };

    this.categoryService.updateCategory(id, updateCategoryRequestDto);

  }

}
