import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaInputBasicComponent } from './obqa-input-basic.component';

describe('ObqaInputBasicComponent', () => {
  let component: ObqaInputBasicComponent;
  let fixture: ComponentFixture<ObqaInputBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaInputBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaInputBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
