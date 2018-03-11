import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaTableSimpleComponent } from './obqa-table-simple.component';

describe('ObqatableSimpleComponent', () => {
  let component: ObqaTableSimpleComponent;
  let fixture: ComponentFixture<ObqaTableSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaTableSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaTableSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
