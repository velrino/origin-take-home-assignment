import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';

import {
  AppRoutingModule,
  declarations,
  bootstrap,
} from './app-routing.module';

@NgModule({
  declarations,
  imports: [BrowserModule, AppRoutingModule, NgxCurrencyModule],
  providers: [],
  bootstrap,
})
export class AppModule {}
