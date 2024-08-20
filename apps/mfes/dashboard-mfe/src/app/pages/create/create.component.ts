import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '@ecommerce-shell/access-data';
import { ProductPayload } from '@ecommerce-shell/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  productsService = inject(ProductsService);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    image: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    if (
      this.form.invalid ||
      !this.form.value.title ||
      !this.form.value.price ||
      !this.form.value.description ||
      !this.form.value.image
    ) {
      return;
    }

    const payload: ProductPayload = {
      title: this.form.value.title,
      price: this.form.value.price,
      description: this.form.value.description,
      image: this.form.value.image,
    };

    this.productsService.addProduct(payload)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      })
  }
}
