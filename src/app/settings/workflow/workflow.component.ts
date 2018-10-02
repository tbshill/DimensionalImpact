import { Component, OnInit } from '@angular/core';
import { Part } from '../../models/Part';
import { PartService } from '../../services/part.service';

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
  public processed_data = [];

  public edit_enabled = false;

  addColumn() {}
  removeColumn() {}

  ngOnInit(): void {
    this.partService.getPartsObservable().subscribe(next => {
      next.forEach(element => {
        const temp = { name: '' };
        temp.name = element.name;
        element.proceses.forEach(process => {
          temp[process.name] = process.duration;
        });

        this.processed_data.push(temp);
      });

      console.log(this.processed_data);

      const okeys = Object.keys(this.processed_data[0]);
      this.displayedColumns = okeys;
      this.columnsToDisplay = okeys.slice();
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

const TEST_DATA: Part[] = [
  {
    name: 'BK-Prt',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 5.75 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: 4 },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: undefined },
      { name: 'Hand Sand', duration: undefined },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: 5 },
      { name: 'Paint top color', duration: undefined },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BK-Wht',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 5.75 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: 4 },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: 2.5 },
      { name: 'Hand Sand', duration: undefined },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: undefined },
      { name: 'Paint top color', duration: 2.5 },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BKDP-FJ',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 14.5 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: 4 },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: undefined },
      { name: 'Hand Sand', duration: undefined },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: 5 },
      { name: 'Paint top color', duration: undefined },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BKDP-BC',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 6.7 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: 4 },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: undefined },
      { name: 'Hand Sand', duration: undefined },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: 5 },
      { name: 'Paint top color', duration: undefined },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'BK-Prt-2b',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 6.7 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: 4 },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: 3.5 },
      { name: 'Base, Lacquer', duration: undefined },
      { name: 'Hand Sand', duration: 0.5 },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: 5 },
      { name: 'Paint top color', duration: undefined },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'Old Paint',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 10.5 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: 1.5 },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: undefined },
      { name: 'Hand Sand', duration: 0.5 },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: 5 },
      { name: 'Paint top color', duration: undefined },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'Sbwy',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 9 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: undefined },
      { name: 'Base H2O', duration: undefined },
      { name: 'Base, H20, roll', duration: undefined },
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
      { name: 'SandBlast', duration: undefined },
      { name: 'Base H2O', duration: 3.5 },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: undefined },
      { name: 'Hand Sand', duration: undefined },
      { name: 'Flap Sand', duration: undefined },
      { name: 'Print', duration: 5 },
      { name: 'Paint top color', duration: undefined },
      { name: 'Clearcoat', duration: undefined }
    ]
  },
  {
    name: 'Wave',
    proceses: [
      { name: 'Cut Panel', duration: 1 },
      { name: 'Grain', duration: undefined },
      { name: 'Groove', duration: 0.75 },
      { name: 'CNC', duration: 6.3 },
      { name: 'Inserts', duration: 2 },
      { name: 'SandBlast', duration: undefined },
      { name: 'Base H2O', duration: undefined },
      { name: 'Base, H20, roll', duration: undefined },
      { name: 'Base, Lacquer', duration: 2.5 },
      { name: 'Hand Sand', duration: undefined },
      { name: 'Flap Sand', duration: 1 },
      { name: 'Print', duration: undefined },
      { name: 'Paint top color', duration: 2.5 },
      { name: 'Clearcoat', duration: undefined }
    ]
  }
];

export interface Proceses {
  name: string;
  duration: number;
}
