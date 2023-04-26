import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketService } from './websocket/websocket.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
  ],
  providers: [
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
