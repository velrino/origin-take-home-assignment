import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

import { InputDateComponent } from './input-date.component';
// import { InputDateComponent } from 'src/app/shared/component/input-date/input-date.component';
import { InputDateInformedDto } from 'src/app/shared/component/input-date/input-date-informed.interface';

describe('InputDateComponent', () => {
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
      declarations: [InputDateComponent],
    }).compileComponents();
  });

  it('should create the InputDateComponent', () => {
    const fixture = TestBed.createComponent(InputDateComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  describe('incrementMonth', () => {
    it('should check when increment 6 months in 10/6/2020 is equal 10/12/2020', () => {
      const fixture = TestBed.createComponent(InputDateComponent);
      fixture.detectChanges();
      const instance = fixture.componentInstance;
      const data = { date: new Date(2020, 6, 10) };
      const resultExpected = { date: new Date(2020, 12, 10) };
      const result = instance.incrementMonth(data.date, true, 6);

      expect(result === resultExpected.date.getTime()).toBeTrue();
    });

    it('should check when decrement 6 months in 10/6/2020 is equal 10/1/2020', () => {
      const fixture = TestBed.createComponent(InputDateComponent);
      fixture.detectChanges();
      const instance = fixture.componentInstance;
      const data = { date: new Date(2020, 6, 10) };
      const resultExpected = { date: new Date(2020, 3, 10) };
      const result = instance.incrementMonth(data.date, false, 3);

      expect(result === resultExpected.date.getTime()).toBeTrue();
    });
  });
});
