import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrdersItem } from '../orders/orders-datasource';
import { OrdersService } from '../services/orders.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  items: Observable<any[]>;

  constructor(orders: OrdersService) {
    this.items = orders.getItems();
  }

  ngOnInit() {
  }

}
