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

  calculateGoalByMonth(): void {
    const goal = this.form.get('totalAmout')?.value;
    this.amountByMonths =
      goal > 0 ? goal / this.dateInformedData.monthsDiff : 0;
  }

  inputDateChange(value: InputDateInformedDto): void {
    this.dateInformedData = value;
    this.calculateGoalByMonth();
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
