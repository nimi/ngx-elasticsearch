import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsContainerComponent } from './controls-container.component';

describe('ControlsContainerComponent', () => {
  let component: ControlsContainerComponent;
  let fixture: ComponentFixture<ControlsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
