import { Component, OnInit, Input } from '@angular/core';
import { Machine } from '../../../Store/models/machine.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MachinesService } from '../../../services/machines.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {
  @Input()
  machine: Machine;

  activeMachineGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  });
  constructor(
    private machineService: MachinesService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  saveMachine(): void {
    this.machineService.saveMachine(this.machine);
    this.snackBar.open('Machine Saved', 'Close', {
      duration: 2000
    });
  }
}
