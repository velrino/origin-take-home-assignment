import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimulationPage } from './simulation.page';

describe('SimulationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SimulationPage],
    }).compileComponents();
  });

  it('should create the simulation', () => {
    const fixture = TestBed.createComponent(SimulationPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
