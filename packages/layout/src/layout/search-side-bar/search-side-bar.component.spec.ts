import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSideBarComponent } from './search-side-bar.component';

describe('SearchSideBarComponent', () => {
  let component: SearchSideBarComponent;
  let fixture: ComponentFixture<SearchSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
