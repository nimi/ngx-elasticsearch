import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRangeFilterComponent } from './dynamic-range-filter.component';

describe('DynamicRangeFilterComponent', () => {
  let component: DynamicRangeFilterComponent;
  let fixture: ComponentFixture<DynamicRangeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicRangeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRangeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
