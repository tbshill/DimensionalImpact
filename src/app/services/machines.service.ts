import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Machine } from '../models/machine';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MachinesService {
  items: Observable<any>;
  public database: AngularFirestore;
  public machineCollection: AngularFirestoreCollection;

  constructor(public db: AngularFirestore) {
    this.machineCollection = db.collection<Machine>('Machines');
    this.items = this.machineCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Machine;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getMachinesObervable(): Observable<any> {
    return(this.items);
  }

  saveMachine(data: Machine) {
    this.machineCollection.doc<Machine>(data.id).update(data);
  }

  addMachine(data: Machine) {
    this.machineCollection.add(data);
  }
}
