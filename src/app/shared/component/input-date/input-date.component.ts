import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  OnInit,
} from '@angular/core';

import { KEY_CODE } from '../../enums/keyboard';
import { InputDateInformedDto } from './input-date-informed.interface';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent implements OnInit {
  @Output() dateInformed = new EventEmitter<InputDateInformedDto>();
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
    this.dateInformed.emit({
      date: this.actualDate,
      month: this.month,
      year: this.year,
      monthsDiff: this.diffMonths(this.actualDate),
    });
  }

  incrementMonth(date: Date, increment = true, months = 1): number {
    const getMonth = date.getMonth();
    const actualMonth = increment ? getMonth + months : getMonth - months;
    const newActualDate = date.setMonth(actualMonth);

    return newActualDate;
  }

  diffMonths(date: Date): number {
    let diff = (date.getTime() - new Date().getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  }

  @HostListener('document:keydown', ['$event'])
  listenKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.calculateMonth();
    } else if (event.key === KEY_CODE.LEFT_ARROW) {
      this.calculateMonth(false);
    }
  }
}
