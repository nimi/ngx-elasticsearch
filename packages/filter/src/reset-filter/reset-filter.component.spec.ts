import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFilterComponent } from './reset-filter.component';

describe('ResetFilterComponent', () => {
  let component: ResetFilterComponent;
  let fixture: ComponentFixture<ResetFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
