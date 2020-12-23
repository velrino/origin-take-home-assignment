import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

import { KEY_CODE } from '../../enums/keyboard';
import { InputDateComponent } from './input-date.component';

describe('InputDateComponent', () => {
  const locale = 'en-US';
  const leftArrow = new KeyboardEvent('keydown', { key: KEY_CODE.LEFT_ARROW });
  const rightArrow = new KeyboardEvent('keydown', {
    key: KEY_CODE.RIGHT_ARROW,
  });

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

  describe('calculateMonth and handleDate', () => {
    it('should check value todayDate is the same in a month', () => {
      const fixture = TestBed.createComponent(InputDateComponent);
      const instance = fixture.componentInstance;
      const resultExpected = new Date(
        new Date(instance.incrementMonth(new Date(), true, 1)).setHours(
          0,
          0,
          0,
          0
        )
      );
      fixture.detectChanges();

      expect(
        new Date(instance.actualDate).setHours(0, 0, 0, 0) ===
          resultExpected.getTime()
      ).toBeTrue();
      expect(
        instance.month ===
          resultExpected.toLocaleString(locale, { month: 'long' })
      ).toBeTrue();
      expect(instance.year === resultExpected.getFullYear()).toBeTrue();
    });
  });

  describe('should HostListener in listenKeyboardEvent', () => {
    it('LeftArrow', () => {
      const fixture = TestBed.createComponent(InputDateComponent);
      const instance = fixture.componentInstance;
      const resultExpected = new Date(
        new Date(instance.incrementMonth(new Date())).setHours(0, 0, 0, 0)
      );
      fixture.detectChanges();

      document.dispatchEvent(leftArrow);
      document.dispatchEvent(leftArrow);

      expect(
        new Date(instance.actualDate).setHours(0, 0, 0, 0) ===
          resultExpected.getTime()
      ).toBeTrue();
      expect(
        instance.month ===
          resultExpected.toLocaleString(locale, { month: 'long' })
      ).toBeTrue();
      expect(instance.year === resultExpected.getFullYear()).toBeTrue();
      expect(instance.lastCalculateMonth).toBeFalsy();
    });

    it('RightArrow', () => {
      const fixture = TestBed.createComponent(InputDateComponent);
      const instance = fixture.componentInstance;
      const resultExpected = new Date(
        new Date(instance.incrementMonth(new Date(), true, 3)).setHours(
          0,
          0,
          0,
          0
        )
      );
      fixture.detectChanges();

      document.dispatchEvent(rightArrow);
      document.dispatchEvent(rightArrow);

      expect(
        new Date(instance.actualDate).setHours(0, 0, 0, 0) ===
          resultExpected.getTime()
      ).toBeTrue();
      expect(
        instance.month ===
          resultExpected.toLocaleString(locale, { month: 'long' })
      ).toBeTrue();
      expect(instance.year === resultExpected.getFullYear()).toBeTrue();
      expect(instance.lastCalculateMonth).toBeTruthy();
    });

    it('LeftArrow with RightArrow', () => {
      const fixture = TestBed.createComponent(InputDateComponent);
      const instance = fixture.componentInstance;
      const resultExpected = new Date(
        new Date(instance.incrementMonth(new Date())).setHours(0, 0, 0, 0)
      );
      fixture.detectChanges();

      document.dispatchEvent(rightArrow);
      document.dispatchEvent(leftArrow);
      document.dispatchEvent(rightArrow);
      document.dispatchEvent(leftArrow);

      expect(
        new Date(instance.actualDate).setHours(0, 0, 0, 0) ===
          resultExpected.getTime()
      ).toBeTrue();
      expect(
        instance.month ===
          resultExpected.toLocaleString(locale, { month: 'long' })
      ).toBeTrue();
      expect(instance.year === resultExpected.getFullYear()).toBeTrue();
      expect(instance.lastCalculateMonth).toBeTruthy();
    });
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
