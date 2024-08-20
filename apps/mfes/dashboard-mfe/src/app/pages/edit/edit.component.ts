import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '@ecommerce-shell/access-data';
import { ProductPayload, Product } from '@ecommerce-shell/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  productsService = inject(ProductsService);
  router = inject(Router);
  product = inject(ActivatedRoute).snapshot.data['product'] as Product;

  form = new FormGroup({
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number>(this.product.price, {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>(this.product.description, {
      nonNullable: true,
      validators: Validators.required,
    }),
    image: new FormControl<string>(this.product.image, {
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

    this.productsService.changeProduct(this.product.id, payload)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      })
  }
}
