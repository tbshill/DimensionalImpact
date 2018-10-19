import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCountTileComponent } from './order-count-tile.component';

describe('OrderCountTileComponent', () => {
  let component: OrderCountTileComponent;
  let fixture: ComponentFixture<OrderCountTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCountTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCountTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
