import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '@ecommerce-shell/models';
import { ProductsService } from '@ecommerce-shell/access-data';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
})
export class ListComponent {

  productsService = inject(ProductsService);

  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);

  onDelete(product: Product) {
    this.productsService.deleteProduct(product.id)
      .subscribe(() => {
        this.removeProduct(product);
      })
  }

  private removeProduct(product: Product) {
    this.products.update(products => products.filter(p => p.id !== product.id));
  }

}
