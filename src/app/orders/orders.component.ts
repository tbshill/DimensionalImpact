import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { OrdersDataSource } from './orders-datasource';
import { OrdersService } from '../services/orders.service';
import { OrderEditorComponent } from '../order-editor/order-editor.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: OrdersDataSource;
  aquiring_data = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // tslint:disable-next-line:max-line-length
  displayedColumns = [
    'Invoice',
    'PO',
    'Order Date',
    'Shipped Date',
    'Adjusted Shipped Date',
    'Customer',
    'Dealer',
    'Items',
    'Notes',
    'Status'
  ];

  constructor(private orders: OrdersService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new OrdersDataSource(
      this.paginator,
      this.sort,
      this.orders
    );
  }

  onRowClicked(row) {
    console.log(row);
  }

  createNewOrder() {
    console.log('Opening Dialog to create new order');
    const dialogRef = this.dialog.open(OrderEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
