import { Component, OnInit, Input } from '@angular/core';
import { Machine } from '../../../models/machine';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {
  @Input() machine: Machine;

  activeMachineGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });
  constructor() { }

  ngOnInit() {
  }

}
