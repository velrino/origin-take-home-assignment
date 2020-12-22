import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';

import {
  AppRoutingModule,
  declarations,
  bootstrap,
} from './app-routing.module';

@NgModule({
  bootstrap,
  declarations,
  imports: [BrowserModule, AppRoutingModule, NgxCurrencyModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
