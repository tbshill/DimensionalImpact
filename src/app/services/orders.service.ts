import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('Orders').valueChanges();
  }

  getItems(): Observable<any[]> {
    return(this.items);
  }
}
