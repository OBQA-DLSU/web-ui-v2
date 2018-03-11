import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaUploadBasicComponent } from './obqa-upload-basic.component';

describe('ObqaUploadBasicComponent', () => {
  let component: ObqaUploadBasicComponent;
  let fixture: ComponentFixture<ObqaUploadBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaUploadBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaUploadBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
