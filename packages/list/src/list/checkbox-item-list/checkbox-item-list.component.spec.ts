import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxItemListComponent } from './checkbox-item-list.component';

describe('CheckboxItemListComponent', () => {
  let component: CheckboxItemListComponent;
  let fixture: ComponentFixture<CheckboxItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
