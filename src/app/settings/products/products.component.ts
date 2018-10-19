import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductTemplate } from '../../Store/models/product-template.model';
import { ProductsDetailComponent } from './products-detail/products-detail.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public selectedProduct: ProductTemplate;
  @ViewChild(ProductsDetailComponent)
  detailView: ProductsDetailComponent;

  constructor() {}

  ngOnInit() {}

  selectProductEvent(product: ProductTemplate): void {
    console.log('Selected Product: ', product);
    this.detailView.product = product;
  }
}
