import { Component, EventEmitter, HostListener, Output } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
}
@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent {
  @Output() dateInformed = new EventEmitter<Date>();
  locale = 'en-US';
  todayDate: number = new Date().setHours(0, 0, 0, 0);
  actualDate: Date;
  month = '';
  year = 0;
  lastCalculateMonth = false;

  constructor() {
    this.handleDate(null);
  }

  calculateMonth(incrementMonth = true): void {
    const { actualDate } = this;
    const getMonth = actualDate.getMonth();
    const actualMonth = incrementMonth ? getMonth + 1 : getMonth - 1;
    const newActualDate = actualDate.setMonth(actualMonth);
    this.lastCalculateMonth =
      new Date(this.todayDate).setHours(0, 0, 0, 0) <=
      new Date(newActualDate).setHours(0, 0, 0, 0);
    this.handleDate(new Date(newActualDate));
  }

  handleDate(dateInformed: Date | null): void {
    this.actualDate =
      this.lastCalculateMonth && dateInformed ? dateInformed : new Date();
    this.month = this.actualDate.toLocaleString(this.locale, { month: 'long' });
    this.year = this.actualDate.getFullYear();
    this.dateInformed.emit(this.actualDate);
  }

  @HostListener('window:keyup', ['$event'])
  listenKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.calculateMonth();
    } else if (event.key === KEY_CODE.LEFT_ARROW) {
      this.calculateMonth(false);
    }
  }
}
