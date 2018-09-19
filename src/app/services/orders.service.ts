import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection<Order>('Orders').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getItems(): Observable<any[]> {
    return(this.items);
  }
}
