import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  OrderEditorComponent,
  DialogData
} from '../../../order-editor/order-editor.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MachinesService } from '../../../services/machines.service';
import { Machine } from '../../../Store/models/machine.model';

@Component({
  selector: 'app-machine-editor',
  templateUrl: './machine-editor.component.html',
  styleUrls: ['./machine-editor.component.scss']
})
export class MachineEditorComponent implements OnInit {
  public machineGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    quantity: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<OrderEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public machinesService: MachinesService
  ) {}

  ngOnInit() {}

  addMachine() {
    console.log('Adding Machine');
    const data = this.machineGroup.value;
    this.machinesService.addMachine(data);
  }
}
