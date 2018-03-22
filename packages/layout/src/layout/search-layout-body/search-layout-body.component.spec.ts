import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLayoutBodyComponent } from './search-layout-body.component';

describe('SearchLayoutBodyComponent', () => {
  let component: SearchLayoutBodyComponent;
  let fixture: ComponentFixture<SearchLayoutBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLayoutBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLayoutBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
