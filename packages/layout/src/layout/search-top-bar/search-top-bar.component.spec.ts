import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopBarComponent } from './search-top-bar.component';

describe('SearchTopBarComponent', () => {
  let component: SearchTopBarComponent;
  let fixture: ComponentFixture<SearchTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
