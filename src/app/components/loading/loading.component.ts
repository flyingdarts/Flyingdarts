import { Component } from '@angular/core';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/queue.json'
  };


  constructor(public loader: LoadingService) {
  }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}