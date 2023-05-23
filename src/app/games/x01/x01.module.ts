import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { X01RoutingModule } from './x01-routing.module';
import { X01Component } from './x01.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { x01Reducer } from './x01.reducer';

@NgModule({
  declarations: [
    X01Component
  ],
  imports: [
    CommonModule,
    X01RoutingModule,
    SharedModule,
    StoreModule.forFeature('x01', x01Reducer)
  ]
})
export class X01Module { }
