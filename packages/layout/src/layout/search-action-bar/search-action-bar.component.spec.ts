import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActionBarComponent } from './search-action-bar.component';

describe('SearchActionBarComponent', () => {
  let component: SearchActionBarComponent;
  let fixture: ComponentFixture<SearchActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchActionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
