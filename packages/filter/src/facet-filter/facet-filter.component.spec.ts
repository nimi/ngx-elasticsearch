import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetFilterComponent } from './facet-filter.component';

describe('FacetFilterComponent', () => {
  let component: FacetFilterComponent;
  let fixture: ComponentFixture<FacetFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
