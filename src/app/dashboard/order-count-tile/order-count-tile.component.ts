import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-count-tile',
  templateUrl: './order-count-tile.component.html',
  styleUrls: ['./order-count-tile.component.scss']
})
export class OrderCountTileComponent implements OnInit {
  orderCount: Observable<number>;
  loading = true;
  constructor(public orderService: OrdersService) {}
  ngOnInit() {
    this.orderCount = this.orderService.getOrderCountObservable();
  }
}
