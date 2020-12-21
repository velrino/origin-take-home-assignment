import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimulationComponent } from './simulation.page';

describe('SimulationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SimulationComponent],
    }).compileComponents();
  });

  it('should create the simulation', () => {
    const fixture = TestBed.createComponent(SimulationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
