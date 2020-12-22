import { Component } from '@angular/core';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation.page.html',
  styleUrls: ['./simulation.page.scss'],
})
export class SimulationPage {
  customCurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: false,
    precision: 2,
    prefix: '',
  };

  inputDateChange(date: Date): void {
    console.log(date);
  }
}
