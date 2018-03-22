import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSearchLayoutComponent } from './layout.component';

describe('NgxSearchLayoutComponent', () => {
  let component: NgxSearchLayoutComponent;
  let fixture: ComponentFixture<NgxSearchLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSearchLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
