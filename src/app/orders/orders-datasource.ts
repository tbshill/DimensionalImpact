import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, retry } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { OrdersService } from '../services/orders.service';

// TODO: Replace this with your own data model type
export interface OrdersItem {
  Invoice: string;
  PO: string;
  OrderDate: String;
  ShippedDte: Date;
  AdjustedShippedDate: Date;
  Custormer: String;
  Dealer: String;
  Items: String;
  Notes: String;
  Status: String;
}

/**
 * Data source for the Orders view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrdersDataSource extends DataSource<OrdersItem> {
  data: OrdersItem[];

  constructor(private paginator: MatPaginator, private sort: MatSort, private ordersdb: OrdersService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrdersItem[]> {


    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   this.ordersdb.getItems(),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];

    // // Set the paginators length
    // this.paginator.length = this.data.length;

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));


    return this.ordersdb.getItems();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrdersItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrdersItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Invoice': return compare(a.Invoice, b.Invoice, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
