import { Component, OnInit, Input } from '@angular/core';
import { ProductTemplate } from '../../../models/product-template';
import { ProductTemplatesService } from '../../../services/product-templates.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  @Input() product: ProductTemplate;

  constructor(private ptService: ProductTemplatesService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  saveProduct(): void {
    this.ptService.saveProductTemplate(this.product);
    this.snackBar.open('Product Saved', 'Closed', {
      duration: 2000
    });
  }
}
