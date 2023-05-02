import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [
  ]
})
export class PrivateModule { }
