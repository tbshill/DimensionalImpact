import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductTemplate } from '../models/product-template';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplatesService {
  products: Observable<any>;
  collection: AngularFirestoreCollection;

  constructor(public db: AngularFirestore) {
    this.collection = db.collection('ProductTemplates');

    this.products = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ProductTemplate;
        const id = a.payload.doc.id;
        return { id, ...data };
    })));
   }

   getProductTempatesObservable(): Observable<any> {
     return(this.products);
   }

   saveProductTemplate(data: ProductTemplate): void {
     this.collection.doc<ProductTemplate>(data.id).update(data);
   }

   addProductTemplate(data: ProductTemplate): void {
     this.collection.add(data);
   }
}
