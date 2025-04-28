import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryComponentInputComponent } from './secondaryComponent-input.component';

describe('Secondary3x3InputComponent', () => {
  let component: SecondaryComponentInputComponent;
  let fixture: ComponentFixture<SecondaryComponentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryComponentInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryComponentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
