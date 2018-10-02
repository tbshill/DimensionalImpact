import { ProductTemplate } from './product-template';

export class Order {
  Invoice: number;
  PO: string;
  OrderDate: Date;
  ShippedDate: Date;
  AdjustedShippedDate: Date;
  Custormer: String;
  Dealer: String;
  Items: Array<string>;
  Notes: String;
  Status: String;

  constructor(invoiceNumber) {
    this.Invoice = invoiceNumber;
  }
}
