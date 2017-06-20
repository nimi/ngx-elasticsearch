import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitsListItemComponent } from './hits-list-item.component';

describe('HitsListItemComponent', () => {
  let component: HitsListItemComponent;
  let fixture: ComponentFixture<HitsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
