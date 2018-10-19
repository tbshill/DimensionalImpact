import { Component, OnInit } from '@angular/core';
import { Part } from '../../Store/models/Part.model';
import { PartService } from '../../services/part.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  constructor(private partService: PartService) {}

  public aquiring_data = true;

  public displayedColumns: string[] = [];
  public columnsToDisplay: string[] = [];
  public processed_data: Subject<any[]> = new Subject();

  public edit_enabled = false;

  addColumn() {}

  removeColumn() {}

  updateSymbol(element, column, newVal): void {
    console.log('Saving Data');
    console.log(element);
    console.log(`Column: ${column}`);
    console.log(`NewVal: ${newVal}`);

    const tempProcesses = [];
    for (const key in element) {
      if (key === 'name') {
      } else if (element.hasOwnProperty(key) && key !== 'id') {
        const el = element[key];
        let newProcess = { machine_name: '', duration: 0 };
        if (column === key) {
          newProcess = { machine_name: key, duration: newVal };
        } else {
          newProcess = { machine_name: key, duration: element[key] };
        }
        tempProcesses.push(newProcess);
      }
    }

    const tempPart: Part = {
      name: element.name as string,
      id: element.id as string,
      processes: tempProcesses
    };

    this.partService.updatePart(tempPart);
  }

  ngOnInit(): void {
    this.partService.getPartsObservable().subscribe(next => {
      console.log(next);
      const tempData = [];
      next.forEach(element => {
        console.log(element);
        const temp = { machine_name: '', id: '' };
        temp.name = element.name;
        temp.id = element.id;
        element.proceses.forEach(process => {
          console.log(process);
          temp[process.machine_name] = process.duration;
        });

        tempData.push(temp);
      });

      this.processed_data.next(tempData);

      console.log(tempData);

      const okeys = Object.keys(tempData[0]);
      this.displayedColumns = okeys;
      this.columnsToDisplay = okeys.slice();
      this.columnsToDisplay = this.columnsToDisplay.filter(val => {
        if (val !== 'id') {
          return val;
        }
      });
    });
    // this.partService.refreshCollection();
  }

  addProduct() {}

  enableEdit(): void {
    this.edit_enabled = true;
  }

  saveProduct(): void {
    this.edit_enabled = false;
  }
}

// export class ExampleDataSource extends DataSource<any> {
//   private dataSubject = new BehaviorSubject<Element[]>([]);

//   data() {
//     return this.dataSubject.value;
//   }

//   update(data) {
//     this.dataSubject.next(data);
//   }

//   constructor(data: any[]) {
//     super();
//     this.dataSubject.next(data);
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Element[]> {
//     return this.dataSubject;
//   }

//   disconnect() {}
// }

const TEST_DATA: Part[] = [
  {
    name: 'BK-Prt',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 5.75 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: 4 },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: undefined },
      { machine_name: 'Hand Sand', duration: undefined },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: 5 },
      { machine_name: 'Paint top color', duration: undefined },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BK-Wht',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 5.75 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: 4 },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: 2.5 },
      { machine_name: 'Hand Sand', duration: undefined },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: undefined },
      { machine_name: 'Paint top color', duration: 2.5 },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BKDP-FJ',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 14.5 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: 4 },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: undefined },
      { machine_name: 'Hand Sand', duration: undefined },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: 5 },
      { machine_name: 'Paint top color', duration: undefined },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BKDP-BC',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 6.7 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: 4 },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: undefined },
      { machine_name: 'Hand Sand', duration: undefined },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: 5 },
      { machine_name: 'Paint top color', duration: undefined },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BK-Prt-2b',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 6.7 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: 4 },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: 3.5 },
      { machine_name: 'Base, Lacquer', duration: undefined },
      { machine_name: 'Hand Sand', duration: 0.5 },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: 5 },
      { machine_name: 'Paint top color', duration: undefined },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'Old Paint',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 10.5 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: 1.5 },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: undefined },
      { machine_name: 'Hand Sand', duration: 0.5 },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: 5 },
      { machine_name: 'Paint top color', duration: undefined },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'Sbwy',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 9 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: undefined },
      { machine_name: 'Base H2O', duration: undefined },
      { machine_name: 'Base, H20, roll', duration: undefined },
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
      { machine_name: 'SandBlast', duration: undefined },
      { machine_name: 'Base H2O', duration: 3.5 },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: undefined },
      { machine_name: 'Hand Sand', duration: undefined },
      { machine_name: 'Flap Sand', duration: undefined },
      { machine_name: 'Print', duration: 5 },
      { machine_name: 'Paint top color', duration: undefined },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'Wave',
    processes: [
      { machine_name: 'Cut Panel', duration: 1 },
      { machine_name: 'Grain', duration: undefined },
      { machine_name: 'Groove', duration: 0.75 },
      { machine_name: 'CNC', duration: 6.3 },
      { machine_name: 'Inserts', duration: 2 },
      { machine_name: 'SandBlast', duration: undefined },
      { machine_name: 'Base H2O', duration: undefined },
      { machine_name: 'Base, H20, roll', duration: undefined },
      { machine_name: 'Base, Lacquer', duration: 2.5 },
      { machine_name: 'Hand Sand', duration: undefined },
      { machine_name: 'Flap Sand', duration: 1 },
      { machine_name: 'Print', duration: undefined },
      { machine_name: 'Paint top color', duration: 2.5 },
      { machine_name: 'Clearcoat', duration: undefined }
    ]
  }
];
