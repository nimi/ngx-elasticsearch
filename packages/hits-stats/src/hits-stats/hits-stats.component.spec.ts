import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitsStatsComponent } from './hits-stats.component';

describe('HitsStatsComponent', () => {
  let component: HitsStatsComponent;
  let fixture: ComponentFixture<HitsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
