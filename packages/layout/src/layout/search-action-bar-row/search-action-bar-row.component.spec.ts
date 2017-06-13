import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActionBarRowComponent } from './search-action-bar-row.component';

describe('SearchActionBarRowComponent', () => {
  let component: SearchActionBarRowComponent;
  let fixture: ComponentFixture<SearchActionBarRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchActionBarRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActionBarRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
