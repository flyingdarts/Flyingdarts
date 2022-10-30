import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './login/login.component';
import { X01Component } from './x01/x01.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'x01',
    component: X01Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
