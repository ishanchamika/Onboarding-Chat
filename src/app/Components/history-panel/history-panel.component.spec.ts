import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPanelComponent } from './history-panel.component';

describe('HistoryPanelComponent', () => {
  let component: HistoryPanelComponent;
  let fixture: ComponentFixture<HistoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
