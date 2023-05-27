import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'src/app/app.component';
import { AppStore } from 'src/app/app.store';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileApiService } from 'src/app/services/user-profile-api.service';
import { UserProfileStateService } from 'src/app/services/user-profile-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private stateService: UserProfileStateService, 
    private apiService: UserProfileApiService,
    private authService: AmplifyAuthService,
    private router: Router,
    private store: AppStore) {

  }
  async ngOnInit() {
    try {
      var cognitoId = await this.authService.getCognitoId();
      var cognitoName = await this.authService.getCognitoName();
      if (!isNullOrUndefined(cognitoId) && !isNullOrUndefined(cognitoName)) {
        this.apiService.getUserProfile(cognitoName);
        this.store.profile$.subscribe(x=> {
          if (isNullOrUndefined(x)) {
            this.store.setProfile({cognitoUserId: cognitoId, cognitoUserName: cognitoName, UserName: '', Email: '', Country: ''})
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile'] } }])
          } else {
            this.store.setProfile(x!);
            this.router.navigate(['/', 'lobby'])
          }
        })
      }
    } catch(err){
      console.log(err)
    }
  }
}