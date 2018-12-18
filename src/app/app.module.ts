import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { DuplexModule } from './lib/modules/duplex/duplex.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DuplexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
