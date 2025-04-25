import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Secondary2x2InputComponent } from './secondary2x2-input.component';

describe('Secondary2x2InputComponent', () => {
  let component: Secondary2x2InputComponent;
  let fixture: ComponentFixture<Secondary2x2InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Secondary2x2InputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Secondary2x2InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
