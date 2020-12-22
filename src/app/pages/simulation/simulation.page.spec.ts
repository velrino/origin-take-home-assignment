import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimulationPage } from './simulation.page';
import { InputDateComponent } from 'src/app/shared/component/input-date/input-date.component';

describe('SimulationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [SimulationPage, InputDateComponent],
    }).compileComponents();
  });

  it('should create the simulation', () => {
    const fixture = TestBed.createComponent(SimulationPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check amountByMonths is zero', () => {
    const fixture = TestBed.createComponent(SimulationPage);
    fixture.detectChanges();
    const instance = fixture.componentInstance;
    instance.calculateGoalByMonth();
    expect(instance.amountByMonths === 0).toBeTrue();
  });

  it('should totalAmout 10 divider by 1 months is 10', () => {
    const fixture = TestBed.createComponent(SimulationPage);
    fixture.detectChanges();
    const data = {
      totalAmout: 20,
      months: 2,
      resultExpected: 10,
    };
    const instance = fixture.componentInstance;
    instance.form.get('totalAmout')?.setValue(data.totalAmout);
    instance.months = data.months;
    instance.calculateGoalByMonth();
    expect(instance.amountByMonths === data.resultExpected).toBeTrue();
  });
});
