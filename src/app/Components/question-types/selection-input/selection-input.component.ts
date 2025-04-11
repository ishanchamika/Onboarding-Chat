// src/app/components/question-types/selection-input/selection-input.component.ts
import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Option } from '../../../Models/conversation.model';

@Component({
  selector: 'app-selection-input',
  standalone: false,
  templateUrl: './selection-input.component.html',
  styleUrls: ['./selection-input.component.scss']
})
export class SelectionInputComponent extends BaseQuestionComponent implements OnInit {
  
  ngOnInit(): void {
    // Ensure options exist
    if (!this.question.options || this.question.options.length === 0) {
      console.error('Selection input requires options but none were provided');
    }
    // Log to help debug
    console.log('Question options:', this.question.options);
  }
  
  selectOption(option: Option): void {
    this.submitAnswer(option);
  }
}