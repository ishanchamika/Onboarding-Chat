import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsInputComponent } from './buttons-input.component';

describe('ButtonsInputComponent', () => {
  let component: ButtonsInputComponent;
  let fixture: ComponentFixture<ButtonsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
