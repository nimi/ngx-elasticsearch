import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalRefinementFilterComponent } from './hierarchical-refinement-filter.component';

describe('HierarchicalRefinementFilterComponent', () => {
  let component: HierarchicalRefinementFilterComponent;
  let fixture: ComponentFixture<HierarchicalRefinementFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalRefinementFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalRefinementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
