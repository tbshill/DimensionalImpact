import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MachineMasterDataSource } from './machine-master-datasource';
import { MachinesService } from '../../../services/machines.service';
import { MachineEditorComponent } from '../machine-editor/machine-editor.component';
import { Machine } from '../../../models/machine';

@Component({
  selector: 'app-settings/machines/machine-master',
  templateUrl: './machine-master.component.html',
  styleUrls: ['./machine-master.component.css']
})
export class MachineMasterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MachineMasterDataSource;

  @Output() selectMachineEvent = new EventEmitter<Machine>();



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'quantity', 'running'];
  constructor(private machinesService: MachinesService, public dialog: MatDialog) {

  }
  ngOnInit() {
    this.dataSource = new MachineMasterDataSource(this.paginator, this.sort, this.machinesService);
  }

  // addMachine() {
  //   this.machinesService.addMachine();
  //  }

   createNewMachine() {
    console.log('Opening Dialog to create new order');
    const dialogRef = this.dialog.open(MachineEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editMachine(row) {
    console.log();
    this.selectMachineEvent.emit(row);
  }
}
