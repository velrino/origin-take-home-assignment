import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  AppRoutingModule,
  declarations,
  bootstrap,
} from './app-routing.module';

@NgModule({
  declarations,
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap,
})
export class AppModule {}
