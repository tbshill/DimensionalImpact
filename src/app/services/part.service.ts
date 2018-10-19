import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Part } from '../Store/models/Part.model';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { MachinesService } from './machines.service';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private partsCollection: AngularFirestoreCollection;
  private columns: String[] = [];

  constructor(db: AngularFirestore, public machineService: MachinesService) {
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

  public updatePart(part: Part): void {
    console.log(part);
    this.partsCollection.doc<Part>(part.id).set(part);
  }

  public refreshCollection(): void {
    const TEST_DATA: Part[] = [
      {
        name: 'BK-Wht',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 5.75 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 4 },
          { machine_name: 'Base H2O', duration: 3.5 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 2.5 },
          { machine_name: 'Hand Sand', duration: 0 },
          { machine_name: 'Flap Sand', duration: 0 },
          { machine_name: 'Print', duration: 0 },
          { machine_name: 'Paint top color', duration: 2.5 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BKDP-FJ',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 14.5 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 4 },
          { machine_name: 'Base H2O', duration: 3.5 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 0 },
          { machine_name: 'Hand Sand', duration: 0 },
          { machine_name: 'Flap Sand', duration: 0 },
          { machine_name: 'Print', duration: 5 },
          { machine_name: 'Paint top color', duration: 0 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BKDP-BC',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 6.7 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 4 },
          { machine_name: 'Base H2O', duration: 3.5 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 0 },
          { machine_name: 'Hand Sand', duration: 0 },
          { machine_name: 'Flap Sand', duration: 0 },
          { machine_name: 'Print', duration: 5 },
          { machine_name: 'Paint top color', duration: 0 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'BK-Prt-2b',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 6.7 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 4 },
          { machine_name: 'Base H2O', duration: 3.5 },
          { machine_name: 'Base, H20, roll', duration: 3.5 },
          { machine_name: 'Base, Lacquer', duration: 0 },
          { machine_name: 'Hand Sand', duration: 0.5 },
          { machine_name: 'Flap Sand', duration: 0 },
          { machine_name: 'Print', duration: 5 },
          { machine_name: 'Paint top color', duration: 0 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'Old Paint',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 10.5 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 1.5 },
          { machine_name: 'Base H2O', duration: 3.5 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 0 },
          { machine_name: 'Hand Sand', duration: 0.5 },
          { machine_name: 'Flap Sand', duration: 0 },
          { machine_name: 'Print', duration: 5 },
          { machine_name: 'Paint top color', duration: 0 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'Sbwy',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 9 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 0 },
          { machine_name: 'Base H2O', duration: 0 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 2.5 },
          { machine_name: 'Hand Sand', duration: 0.5 },
          { machine_name: 'Flap Sand', duration: 1 },
          { machine_name: 'Print', duration: 12 },
          { machine_name: 'Paint top color', duration: 2.5 },
          { machine_name: 'Clearcoat', duration: 3.5 }
        ]
      },
      {
        name: 'Sawtooth',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 2.5 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 2 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 0 },
          { machine_name: 'Base H2O', duration: 3.5 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 0 },
          { machine_name: 'Hand Sand', duration: 0 },
          { machine_name: 'Flap Sand', duration: 0 },
          { machine_name: 'Print', duration: 5 },
          { machine_name: 'Paint top color', duration: 0 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      },
      {
        name: 'Wave',
        processes: [
          { machine_name: 'Cut Panel', duration: 1 },
          { machine_name: 'Grain', duration: 0 },
          { machine_name: 'Groove', duration: 0.75 },
          { machine_name: 'CNC', duration: 6.3 },
          { machine_name: 'Inserts', duration: 2 },
          { machine_name: 'SandBlast', duration: 0 },
          { machine_name: 'Base H2O', duration: 0 },
          { machine_name: 'Base, H20, roll', duration: 0 },
          { machine_name: 'Base, Lacquer', duration: 2.5 },
          { machine_name: 'Hand Sand', duration: 0 },
          { machine_name: 'Flap Sand', duration: 1 },
          { machine_name: 'Print', duration: 0 },
          { machine_name: 'Paint top color', duration: 2.5 },
          { machine_name: 'Clearcoat', duration: 0 }
        ]
      }
    ];
    console.log('Adding Data');
    TEST_DATA.forEach(data => {
      this.partsCollection.add(data);
    });
  }

  public search(value: string): Observable<Part[]> {
    return this.getPartsObservable().pipe(
      tap(_ => console.log(value)),
      map(next => {
        const ret: Part[] = [];
        next.forEach(part => {
          // console.log(part);
          if (part.name.indexOf(value) === 0) {
            ret.push(part);
          }
        });
        console.log(ret);
        return ret;
      })
    );
  }

  public addPart(): void {
    // this.machineService.machineCollection.valueChanges().;
  }
}
