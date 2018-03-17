import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopiListComponent } from './sopi-list.component';

describe('SopiListComponent', () => {
  let component: SopiListComponent;
  let fixture: ComponentFixture<SopiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
