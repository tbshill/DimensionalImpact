
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineMasterComponent } from './machine-master.component';

describe('MachineMasterComponent', () => {
  let component: MachineMasterComponent;
  let fixture: ComponentFixture<MachineMasterComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
