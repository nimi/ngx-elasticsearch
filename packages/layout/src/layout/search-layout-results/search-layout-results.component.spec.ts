import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLayoutResultsComponent } from './search-layout-results.component';

describe('SearchLayoutResultsComponent', () => {
  let component: SearchLayoutResultsComponent;
  let fixture: ComponentFixture<SearchLayoutResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLayoutResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLayoutResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
