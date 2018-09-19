import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Machine } from '../../models/machine';
import { MatPaginator } from '@angular/material';
import { MachineDetailComponent } from './machine-detail/machine-detail.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  public selectedMachineEvent: Machine;
  @ViewChild(MachineDetailComponent) detailView: MachineDetailComponent;

  constructor() { }

  ngOnInit() {
  }

  selectMachineEvent(machine: Machine): void {
    console.log(machine);
    // this.selectedMachineEvent = machine;
    this.detailView.machine = machine;

  }
}
