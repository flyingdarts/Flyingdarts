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
    console.log("public login oninit")
    try {
      var cognitoId = await this.authService.getCognitoId();
      var cognitoName = await this.authService.getCognitoName();
      if (!isNullOrUndefined(cognitoId) && !isNullOrUndefined(cognitoName)) {
        console.log('getting profile for', cognitoId, cognitoName);
        this.apiService.getUserProfile(cognitoName);
        this.store.profile$.subscribe(x=> {
          if (isNullOrUndefined(x)) {
            console.log('profile was null')
            this.store.setProfile({cognitoUserId: cognitoId, cognitoUserName: cognitoName, UserName: '', Email: '', Country: ''})
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile'] } }])
          } else {
            console.log('found profile, routing to lobby')
            this.store.setProfile(x!);
            this.router.navigate(['/', 'lobby'])
          }
        })
      } else {
        console.log('something null or undefined in login oninit')
      }
    } catch(err){
      console.log('error during oninit login')
      console.log(err)
    }
  }
}