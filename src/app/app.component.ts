import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable, of } from 'rxjs';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public userName$: Observable<string | null> | undefined;
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(private amplifyAuthService: AmplifyAuthService) {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  async ngOnInit() {
    this.amplifyAuthService.getUser().then(user => {
      if (!isNullOrUndefined(user)) {
        this.userName$ = of(user);
      }
    });

    this.isLoggedIn = await this.getLoginStatus();
  }
  title = 'flyingdarts';

  public signOut(): void {
    this.amplifyAuthService.signOut();
  }

  async getLoginStatus(): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch(error) {
      return false;
    }
  }
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}