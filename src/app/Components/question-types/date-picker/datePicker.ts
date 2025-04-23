import { Component, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { BaseQuestionComponent } from '../base-question.component';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'datepicker-icon-demo',
    templateUrl: './datePicker.html',
    standalone: true,
    imports: [DatePickerModule, FormsModule, FluidModule]
})
export class DatePickerIconDemo extends BaseQuestionComponent implements OnInit{
    date1: Date | undefined;
    date2: Date | undefined;
    date3: Date | undefined;

    ngOnInit(): void {
        
    }
    clickCallBack(date: Date)
    {
        this.submitAnswer(date);
    }
}