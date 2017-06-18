import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSelectComponent } from './pagination-select.component';

describe('PaginationSelectComponent', () => {
  let component: PaginationSelectComponent;
  let fixture: ComponentFixture<PaginationSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
