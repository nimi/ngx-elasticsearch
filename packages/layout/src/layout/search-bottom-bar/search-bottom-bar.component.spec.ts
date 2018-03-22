import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBottomBarComponent } from './search-bottom-bar.component';

describe('SearchBottomBarComponent', () => {
  let component: SearchBottomBarComponent;
  let fixture: ComponentFixture<SearchBottomBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBottomBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
