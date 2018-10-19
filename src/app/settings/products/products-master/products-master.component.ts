import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { ProductTemplate } from '../../../Store/models/product-template.model';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ProductTemplatesService } from '../../../services/product-templates.service';
import { ProductTemplateMasterDataSource } from './products-master-datasource';
import { ProductEditorComponent } from '../product-editor/product-editor.component';

@Component({
  selector: 'app-products-master',
  templateUrl: './products-master.component.html',
  styleUrls: ['./products-master.component.scss']
})
export class ProductsMasterComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: ProductTemplateMasterDataSource;

  @Output()
  selectProductEvent = new EventEmitter<ProductTemplate>();

  displayedColumns = ['name', 'description', 'cost'];
  constructor(
    private ptService: ProductTemplatesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new ProductTemplateMasterDataSource(
      this.paginator,
      this.sort,
      this.ptService
    );
  }

  createProductTemplate() {
    console.log('Creating a new product template');
    const dialogRef = this.dialog.open(ProductEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Dialog was closed');
    });
  }

  editProductTemplate(row) {
    this.selectProductEvent.emit(row);
  }
}
