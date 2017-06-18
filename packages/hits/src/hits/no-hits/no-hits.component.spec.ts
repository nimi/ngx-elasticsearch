import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHitsComponent } from './no-hits.component';

describe('NoHitsComponent', () => {
  let component: NoHitsComponent;
  let fixture: ComponentFixture<NoHitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoHitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
