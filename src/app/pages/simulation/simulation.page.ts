import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyMaskInputMode } from 'ngx-currency';

import { InputDateInformedDto } from '../../shared/component/input-date/input-date-informed.interface';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation.page.html',
  styleUrls: ['./simulation.page.scss'],
})
export class SimulationPage {
  customCurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: true,
    precision: 2,
    prefix: '',
    inputMode: CurrencyMaskInputMode.FINANCIAL,
  };
  form = new FormGroup({
    totalAmout: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });
  amountByMonths = 0;
  dateInformedData: InputDateInformedDto;
  months = 1;

  calculateGoalByMonth(): void {
    const goal = this.form.get('totalAmout')?.value;
    if (goal > 0) {
      this.amountByMonths = goal / this.months;
    }
  }

  inputDateChange(value: InputDateInformedDto): void {
    this.dateInformedData = value;
    this.months = this.diffMonths(value.date);
    this.calculateGoalByMonth();
  }

  diffMonths(date: Date): number {
    let diff = (date.getTime() - new Date().getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  }

  formatMoney(amount: number): string {
    return Number(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  totalAmountFormated(): string {
    return this.formatMoney(this.form.get('totalAmout')?.value);
  }
}
