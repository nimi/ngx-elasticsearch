import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalMenuFilterComponent } from './hierarchical-menu-filter.component';

describe('HierarchicalMenuFilterComponent', () => {
  let component: HierarchicalMenuFilterComponent;
  let fixture: ComponentFixture<HierarchicalMenuFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalMenuFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalMenuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
