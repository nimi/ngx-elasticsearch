import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeHistogramComponent } from './range-histogram.component';

describe('RangeHistogramComponent', () => {
  let component: RangeHistogramComponent;
  let fixture: ComponentFixture<RangeHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeHistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
