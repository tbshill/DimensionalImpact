import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Part } from '../models/Part';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private partsCollection: AngularFirestoreCollection;

  constructor(db: AngularFirestore) {
    this.partsCollection = db.collection<Part>('Parts');
  }

  public getPartsObservable(): Observable<Part[]> {
    return this.partsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Part;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public refreshCollection(): void {
    const TEST_DATA: Part[] = [
      {
        name: 'BK-Prt',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 5.75 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 4 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 0 },
          { name: 'Hand Sand', duration: 0 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 5 },
          { name: 'Paint top color', duration: 0 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BK-Wht',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 5.75 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 4 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 2.5 },
          { name: 'Hand Sand', duration: 0 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 0 },
          { name: 'Paint top color', duration: 2.5 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BKDP-FJ',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 14.5 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 4 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 0 },
          { name: 'Hand Sand', duration: 0 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 5 },
          { name: 'Paint top color', duration: 0 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BKDP-BC',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 6.7 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 4 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 0 },
          { name: 'Hand Sand', duration: 0 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 5 },
          { name: 'Paint top color', duration: 0 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BK-Prt-2b',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 6.7 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 4 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 3.5 },
          { name: 'Base, Lacquer', duration: 0 },
          { name: 'Hand Sand', duration: 0.5 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 5 },
          { name: 'Paint top color', duration: 0 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'Old Paint',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 10.5 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 1.5 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 0 },
          { name: 'Hand Sand', duration: 0.5 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 5 },
          { name: 'Paint top color', duration: 0 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'Sbwy',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 9 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 0 },
          { name: 'Base H2O', duration: 0 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 2.5 },
          { name: 'Hand Sand', duration: 0.5 },
          { name: 'Flap Sand', duration: 1 },
          { name: 'Print', duration: 12 },
          { name: 'Paint top color', duration: 2.5 },
          { name: 'Clearcoat', duration: 3.5 }
        ]
      },
      {
        name: 'Sawtooth',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 2.5 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 2 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 0 },
          { name: 'Base H2O', duration: 3.5 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 0 },
          { name: 'Hand Sand', duration: 0 },
          { name: 'Flap Sand', duration: 0 },
          { name: 'Print', duration: 5 },
          { name: 'Paint top color', duration: 0 },
          { name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'Wave',
        proceses: [
          { name: 'Cut Panel', duration: 1 },
          { name: 'Grain', duration: 0 },
          { name: 'Groove', duration: 0.75 },
          { name: 'CNC', duration: 6.3 },
          { name: 'Inserts', duration: 2 },
          { name: 'SandBlast', duration: 0 },
          { name: 'Base H2O', duration: 0 },
          { name: 'Base, H20, roll', duration: 0 },
          { name: 'Base, Lacquer', duration: 2.5 },
          { name: 'Hand Sand', duration: 0 },
          { name: 'Flap Sand', duration: 1 },
          { name: 'Print', duration: 0 },
          { name: 'Paint top color', duration: 2.5 },
          { name: 'Clearcoat', duration: 0 }
        ]
      }
    ];
    console.log('Adding Data');
    TEST_DATA.forEach(data => {
      this.partsCollection.add(data);
    });
  }
}
