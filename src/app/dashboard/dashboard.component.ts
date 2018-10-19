import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  aquiring_data = true;
  orderCount: Observable<number>;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    // Mobile
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Notification Center', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      // Full Screen
      return [
        { title: 'Todays Estimated Production', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.orderCount = this.orderService.getOrderCountObservable();
  }
}
