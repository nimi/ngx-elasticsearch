import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGroupItemComponent } from './filter-group-item.component';

describe('FilterGroupItemComponent', () => {
  let component: FilterGroupItemComponent;
  let fixture: ComponentFixture<FilterGroupItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGroupItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
