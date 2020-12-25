import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

import { SimulationPage } from './simulation.page';
import { InputDateComponent } from 'src/app/shared/component/input-date/input-date.component';
import { InputDateInformedDto } from 'src/app/shared/component/input-date/input-date-informed.interface';

describe('SimulationComponent', () => {
  const locale = 'en-US';

  function incrementMonth(date: Date, increment = true, months = 1): number {
    const getMonth = date.getMonth();
    const actualMonth = increment ? getMonth + months : getMonth - months;
    const newActualDate = date.setMonth(actualMonth);

    return newActualDate;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
      ],
      declarations: [SimulationPage, InputDateComponent],
    }).compileComponents();
  });

  it('should create the simulation', () => {
    const fixture = TestBed.createComponent(SimulationPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  describe('calculateGoalByMonth', () => {
    it('should check amountByMonths is zero', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const instance = fixture.componentInstance;
      instance.calculateGoalByMonth();

      expect(instance.amountByMonths === 0).toBeTrue();
    });

    it('should calculateGoalByMonth to totalAmout 20 divider by 1 months is 20', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const data = {
        totalAmout: 20,
        resultExpected: 20,
      };
      const instance = fixture.componentInstance;
      instance.form.get('totalAmout')?.setValue(data.totalAmout);
      instance.calculateGoalByMonth();

      expect(instance.amountByMonths === data.resultExpected).toBeTrue();
    });

    it('should calculateGoalByMonth to totalAmout 0 divider by 0 months is 0', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const data = {
        totalAmout: 0,
        resultExpected: 0,
      };
      const instance = fixture.componentInstance;
      instance.form.get('totalAmout')?.setValue(data.totalAmout);
      instance.calculateGoalByMonth();
      expect(instance.amountByMonths === data.resultExpected).toBeTrue();
    });
  });

  describe('inputDateChange', () => {
    it('should inputDateChange to same resultExpected', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const resultExpected = {
        amountByMonths: 0,
      };
      const date = new Date();
      const dateInformedData: InputDateInformedDto = {
        date,
        month: date.toLocaleString(locale, { month: 'long' }),
        year: date.getFullYear(),
        monthsDiff: 0,
      };
      const instance = fixture.componentInstance;
      instance.inputDateChange(dateInformedData);

      expect(
        instance.amountByMonths === resultExpected.amountByMonths
      ).toBeTrue();
    });

    it('should inputDateChange to resultExpected', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const resultExpected = {
        amountByMonths: 0,
        months: 14,
      };
      const date = new Date(
        incrementMonth(new Date(), true, resultExpected.months - 1)
      );

      const dateInformedData: InputDateInformedDto = {
        date,
        month: date.toLocaleString(locale, { month: 'long' }),
        year: date.getFullYear(),
        monthsDiff: 14,
      };
      const instance = fixture.componentInstance;
      instance.inputDateChange(dateInformedData);

      expect(
        instance.amountByMonths === resultExpected.amountByMonths
      ).toBeTrue();
    });
  });

  describe('formatMoney', () => {
    it('should formatMoney is same result', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const resultExpected = {
        formatMoney: '$1,000.00',
      };
      const instance = fixture.componentInstance;
      const result = instance.formatMoney(1000);

      expect(result === resultExpected.formatMoney).toBeTrue();
    });
  });

  describe('totalAmountFormated', () => {
    it('should  return $1,000.00 when totalAmout is 1000', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const data = {
        totalAmout: 1000,
      };
      const resultExpected = {
        formatMoney: '$1,000.00',
      };
      const instance = fixture.componentInstance;
      instance.form.get('totalAmout')?.setValue(data.totalAmout);
      const result = instance.totalAmountFormated();

      expect(result === resultExpected.formatMoney).toBeTrue();
    });

    it('should totalAmountFormated is $0.00 when totalAmout is null', () => {
      const fixture = TestBed.createComponent(SimulationPage);
      fixture.detectChanges();
      const data = {
        totalAmout: null,
      };
      const resultExpected = {
        formatMoney: '$0.00',
      };
      const instance = fixture.componentInstance;
      instance.form.get('totalAmout')?.setValue(data.totalAmout);
      const result = instance.totalAmountFormated();
      expect(result === resultExpected.formatMoney).toBeTrue();
    });
  });
});
