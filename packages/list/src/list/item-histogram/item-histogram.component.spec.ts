import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHistogramComponent } from './item-histogram.component';

describe('ItemHistogramComponent', () => {
  let component: ItemHistogramComponent;
  let fixture: ComponentFixture<ItemHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
