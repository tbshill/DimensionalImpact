import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { startWith, map, filter, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { OrdersService } from '../services/orders.service';
import { PartService } from '../services/part.service';
import { Part } from '../Store/models/Part.model';

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
  productList: any[] = [];

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

  nextInvoice: Observable<number>;

  filteredOptions: Observable<Part[]>;

  constructor(
    public dialogRef: MatDialogRef<OrderEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    public snackBar: MatSnackBar,
    public orderService: OrdersService,
    public partsService: PartService
  ) {}

  ngOnInit() {
    this.orderGroup = this.formBuilder.group({
      orders: this.formBuilder.array([])
    });

    this.nextInvoice = this.orderService
      .getNextInvoiceNumberObservable()
      .pipe(tap(next => console.log('Next Invoice Number: ' + next)));
  }

  onSelectProduct(index, product) {
    if (this.productList.length > index) {
      this.productList[index] = product;
    } else {
      this.productList.push = product;
    }
  }

  onInput(index): void {
    console.log(index);
    this.filteredOptions = (this.orderGroup.get(
      'orders'
    ) as FormArray).valueChanges.pipe(
      switchMap(value => this.partsService.search(value[index].product)),
      take(1)
    );
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
    (this.orderGroup.get('orders') as FormArray).push(this.getRow());
    this.productList.push({});
    console.log(this.productList);
  }

  removeOrder(index: number) {
    console.log('Removing row', index);

    (this.orderGroup.get('orders') as FormArray).removeAt(index);
    this.productList.splice(index, 1);
    console.log(this.productList);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  placeOrder(): void {
    console.log('Order is being placed');
    const customerData = this.customerGroup.value;
    const orderData = this.orderGroup.value;

    console.log(customerData);
    console.log(orderData);
    console.log(this.productList);

    this.orderService.addOrder(customerData, this.productList);

    this.snackBar.open('Placed Order', 'Close', {
      duration: 2000
    });
  }

  searchForCustomer(): void {
    console.log('Searching for customer');
  }
}
