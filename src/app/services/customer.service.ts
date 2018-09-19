import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Customer } from '../models/customer';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerCollection: AngularFirestoreCollection;
  database: AngularFirestore;
  constructor(db: AngularFirestore) {
    this.database = db;
    this.customerCollection = db.collection('Customers');
  }


  addCustomer(data): void {
    this.customerCollection.add(data);
  }

  findCustomer(name): Observable<any> {

    return from(this.customerCollection.ref.where('companyName', '==', name).get());

  }



}
