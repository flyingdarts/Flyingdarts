import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentYear: number = new Date().getFullYear();
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor() {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  title = 'flyingdarts';
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}



