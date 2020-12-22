import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
