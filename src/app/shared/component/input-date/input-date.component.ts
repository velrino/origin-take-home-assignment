import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent {
  locale = 'en-US';
  todayDate: any = new Date().setHours(0, 0, 0, 0);
  actualDate: any;
  month = '';
  year = 0;
  lastCalculateMonth = false;

  constructor() {
    this.handleDate(null);
  }

  calculateMonth(increment = true): void {
    const { actualDate } = this;
    const getMonth = actualDate.getMonth();
    const month = increment ? getMonth + 1 : getMonth - 1;
    const date = actualDate.setMonth(month);
    this.lastCalculateMonth =
      new Date(this.todayDate).setHours(0, 0, 0, 0) <=
      new Date(date).setHours(0, 0, 0, 0);
    this.handleDate(date);
  }

  handleDate(date: Date | null): void {
    this.actualDate =
      this.lastCalculateMonth && date ? new Date(date) : new Date();
    this.month = this.actualDate.toLocaleString(this.locale, { month: 'long' });
    this.year = this.actualDate.getFullYear();
  }
}
