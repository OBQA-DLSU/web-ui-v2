import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaTableComponent } from './obqa-table.component';

describe('ObqaTableComponent', () => {
  let component: ObqaTableComponent;
  let fixture: ComponentFixture<ObqaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
