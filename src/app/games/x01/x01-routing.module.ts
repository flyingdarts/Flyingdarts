import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { X01Component } from './x01.component';

const routes: Routes = [
  {
    path: "x01:id",
    component: X01Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class X01RoutingModule { }