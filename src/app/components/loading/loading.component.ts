import { Component, OnInit } from '@angular/core';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { timeInterval } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_header.json'
  };

  constructor(public loader: LoadingService) {
  }
  ngOnInit(): void {
    timeInterval()
  }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}