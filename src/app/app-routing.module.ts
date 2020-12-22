import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { InputDateComponent } from './shared/component/input-date/input-date.component';
// Pages
import { SimulationPage } from './pages/simulation/simulation.page';

const routes: Routes = [
  { path: 'simulation', component: SimulationPage },
  { path: '', redirectTo: 'simulation', pathMatch: 'full' },
];

export const bootstrap = [AppComponent];

export const declarations = [AppComponent, InputDateComponent, SimulationPage];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
