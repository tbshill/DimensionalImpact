import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})

export class MachinesService {
  items: Observable<any>;
  public database: AngularFirestore;

  constructor(public db: AngularFirestore) {
    this.database = db;
    this.items = db.collection('Machines').valueChanges();
  }

  getMachinesObervable(): Observable<any> {
    return( this.items);
  }

  addMachine(data: Machine) {
    this.database.collection('Machines').add(data);
  }
}
