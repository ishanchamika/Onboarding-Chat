import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  standalone: false,
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {
  @Input() disabled: boolean = false;
  @Input() label: string = 'Submit';
  @Output() submit = new EventEmitter<void>();
}