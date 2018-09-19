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

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: OrdersItem[] = [
//   {invoice: 1, PO: 'None', sdate: '' , id: 1, name: 'Hydrogen'},
//   {invoice: 2, PO: 'None', sdate: '' , id: 2, name: 'Helium'},
//   {invoice: 3, PO: 'None', sdate: '' , id: 3, name: 'Lithium'},
//   {invoice: 4, PO: 'None', sdate: '' , id: 4, name: 'Beryllium'},
//   {invoice: 5, PO: 'None', sdate: '' , id: 5, name: 'Boron'},
//   {invoice: 6, PO: 'None', sdate: '' , id: 6, name: 'Carbon'},
//   {invoice: 7, PO: 'None', sdate: '' , id: 7, name: 'Nitrogen'},
//   {invoice: 8, PO: 'None', sdate: '' , id: 8, name: 'Oxygen'},
//   {invoice: 9, PO: 'None', sdate: '' , id: 9, name: 'Fluorine'},
//   {invoice: 10, PO: 'None', sdate: '' , id: 10, name: 'Neon'},
//   {invoice: 11, PO: 'None', sdate: '' , id: 11, name: 'Sodium'},
//   {invoice: 12, PO: 'None', sdate: '' , id: 12, name: 'Magnesium'},
//   {invoice: 13, PO: 'None', sdate: '' , id: 13, name: 'Aluminum'},
//   {invoice: 14, PO: 'None', sdate: '' , id: 14, name: 'Silicon'},
//   {invoice: 15, PO: 'None', sdate: '' , id: 15, name: 'Phosphorus'},
//   {invoice: 16, PO: 'None', sdate: '' , id: 16, name: 'Sulfur'},
//   {invoice: 17, PO: 'None', sdate: '' , id: 17, name: 'Chlorine'},
//   {invoice: 18, PO: 'None', sdate: '' , id: 18, name: 'Argon'},
//   {invoice: 19, PO: 'None', sdate: '' , id: 19, name: 'Potassium'},
//   {invoice: 20, PO: 'None', sdate: '' , id: 20, name: 'Calcium'},
// ];

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
