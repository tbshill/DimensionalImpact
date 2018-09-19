import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';


export interface DialogData {
  animal: string;
  name: string;
}

// TODO Implement loading an existing customer


@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {
  public orderGroup: FormGroup;


  customerGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    company: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),

    streetAddress: new FormControl(''),
    street2Address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  });

  // TODO: This needs to be a list of the products.
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  constructor(public dialogRef: MatDialogRef<OrderEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.orderGroup = this.formBuilder.group({
      orders: this.formBuilder.array([])
    });

    this.filteredOptions = (this.orderGroup.get('orders') as FormArray).valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );


  }


  private _filter(value: string): string[] {
    // TODO Fix the AutoComplete on the proudct page

    // const filterValue = value.toLowerCase();
    const filterValue = value;

    return this.options.filter(option => option.indexOf(filterValue) === 0);
  }


  getRow() {
    const newRow = this.formBuilder.group({
      product: [''],
      quantity: [''],
      notes: ['']
    });

    return newRow;
  }

  addOrder() {

    const newRow = this.formBuilder.group({
      product: [''],
      quantity: [''],
      notes: ['']
    });

    (this.orderGroup.get('orders') as FormArray).push(this.getRow());

  }

  removeOrder(index: number) {
    console.log('Removing row', index);

    (this.orderGroup.get('orders') as FormArray).removeAt(index);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  placeOrder(): void {
    console.log('Order is being placed');
    this._submitCustomer();

    this.snackBar.open('Placed Order','Close',{
      duration: 2000
    });
  }


  private _submitCustomer() {
    const data = this.customerGroup.value;
    this.customerService.addCustomer(data);
  }
}
