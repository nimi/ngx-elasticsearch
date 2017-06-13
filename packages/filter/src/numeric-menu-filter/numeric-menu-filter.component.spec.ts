import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericMenuFilterComponent } from './numeric-menu-filter.component';

describe('NumericMenuFilterComponent', () => {
  let component: NumericMenuFilterComponent;
  let fixture: ComponentFixture<NumericMenuFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericMenuFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericMenuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
