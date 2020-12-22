import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  OnInit,
} from '@angular/core';

import { KEY_CODE } from '../../enums/keyboard';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent implements OnInit {
  @Output() dateInformed = new EventEmitter<Date>();
  locale = 'en-US';
  todayDate: number;
  actualDate: Date = new Date();
  month = '';
  year = 0;
  lastCalculateMonth = false;

  constructor() {
    this.todayDate = this.incrementMonth(new Date(), true);
  }

  ngOnInit(): void {
    this.calculateMonth(true);
  }

  calculateMonth(incrementMonth = true): void {
    const newActualDate = this.incrementMonth(this.actualDate, incrementMonth);
    this.lastCalculateMonth =
      new Date(this.todayDate).setHours(0, 0, 0, 0) <=
      new Date(newActualDate).setHours(0, 0, 0, 0);
    this.handleDate(new Date(newActualDate));
  }

  handleDate(dateInformed: Date | null): void {
    this.actualDate =
      this.lastCalculateMonth && dateInformed
        ? dateInformed
        : new Date(this.incrementMonth(new Date(), true));
    this.month = this.actualDate.toLocaleString(this.locale, { month: 'long' });
    this.year = this.actualDate.getFullYear();
    this.dateInformed.emit(this.actualDate);
  }

  incrementMonth(date: Date, increment = true, months = 1): number {
    const getMonth = date.getMonth();
    const actualMonth = increment ? getMonth + months : getMonth - months;
    const newActualDate = date.setMonth(actualMonth);

    return newActualDate;
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
