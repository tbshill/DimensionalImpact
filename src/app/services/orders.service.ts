import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Order } from '../Store/models/order.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Customer } from '../Store/models/customer.model';

interface SequenceData {
  nextOrderId: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  items: Observable<any[]>;
  ordersCollection: AngularFirestoreCollection;
  sequencesCollection: AngularFirestoreCollection;
  private nextInvoiceNumber = 0;

  constructor(db: AngularFirestore) {
    this.sequencesCollection = db.collection('Sequences');
    this.ordersCollection = db.collection<Order>('Orders');
    this.items = this.ordersCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    this.getNextInvoiceNumberObservable().subscribe(next => {
      this.nextInvoiceNumber = next;
    });
  }

  getOrderCountObservable(): Observable<number> {
    return this.items.pipe(
      map(next => {
        return next.length;
      })
    );
  }

  getItems(): Observable<any[]> {
    return this.items;
  }

  // addOrder(customerData: Customer, orderData): void {
  //   // Get Invoice Number
  //   this.sequencesCollection
  //     .doc('sequenceData')
  //     .valueChanges()
  //     .pipe(take(1))
  //     .subscribe(next => {
  //       const nextOrderId = (next as SequenceData).nextOrderId;
  //       console.log(`Using OrderID ${nextOrderId}`);
  //       this.sequencesCollection
  //         .doc('sequenceData')
  //         .update({ nextOrderId: nextOrderId + 1 })
  //         .then(_ => {
  //           console.log('Incremented OrderId');
  //         })
  //         .catch(err => {
  //           console.error('failed to retrieve and increment orderId coutner');
  //           console.error(err);
  //         });

  //       // Build Order
  //       const order: Order = new Order(1);
  //       order.Invoice = nextOrderId;
  //       order.PO = customerData.company;
  //       order.OrderDate = new Date();
  //       order.ShippedDate = new Date();
  //       order.AdjustedShippedDate = new Date();
  //       order.Custormer = customerData.company;
  //       order.Status = 'not started';
  //       order.Items = orderData;
  //     });
  // }

  public addOrder(customerData: Customer, orderData): void {
    const invoiceNumber = this.nextInvoiceNumber;

    const newOrder = new Order(invoiceNumber);

    newOrder.Custormer = customerData.company;

    this.incrementInvoiceNumber();
  }

  public getNextInvoiceNumberObservable(): Observable<number> {
    return this.sequencesCollection
      .doc<SequenceData>('sequenceData')
      .valueChanges()
      .pipe(
        map(value => {
          return value.nextOrderId;
        })
      );
  }

  private incrementInvoiceNumber(): void {
    this.sequencesCollection
      .doc<SequenceData>('sequenceData')
      .update({ nextOrderId: this.nextInvoiceNumber + 1 });
  }

  // addOrder(order: Order): void {
  //   this.sequencesCollection
  //     .doc('sequenceData')
  //     .get()
  //     .subscribe(next => {
  //       const nextOrderId = next.data().nextOrderNumber;
  //       order.invoice = nextOrderId;
  //       this.sequencesCollection
  //         .doc('sequenceData')
  //         .update({ nextOrderId: nextOrderId + 1 });
  //       this.ordersCollection.add(order);
  //     });
  // }
}
