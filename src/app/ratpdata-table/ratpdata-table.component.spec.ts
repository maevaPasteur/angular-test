import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RATPDataTableComponent } from './ratpdata-table.component';

describe('RATPDataTableComponent', () => {
  let component: RATPDataTableComponent;
  let fixture: ComponentFixture<RATPDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RATPDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RATPDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
