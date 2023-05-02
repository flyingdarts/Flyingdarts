import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public userName$: Observable<string> | undefined;
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(private amplifyAuthService: AmplifyAuthService) {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  ngOnInit(): void {
    this.amplifyAuthService.getUser().then((user: any) => {
      this.userName$ = user.attributes.name;
    });
  }
  title = 'flyingdarts';

  public signOut(): void {
    this.amplifyAuthService.signOut();
  }
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}