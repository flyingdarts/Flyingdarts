import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AmplifyAuthService } from './../../services/amplify-auth.service';
import { UserProfileApiService } from './../../services/user-profile-api.service';
import { CarouselModel } from './../../shared/carousel/carousel.component';
import { WebSocketService } from 'src/app/infrastructure/websocket/websocket.service';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { UserProfileStateService } from 'src/app/services/user-profile-state.service';
import { UserProfileDetails } from 'src/app/shared/models/user-profile-details.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  carouselItems: CarouselModel[] = [
    {
      src: '/assets/registration/social_media.svg',
      title: 'Create an account',
      description: 'You can choose one of the available sign-in methods to create your account.'
    },
    {
      src: '/assets/registration/personal_data.svg',
      title: 'Your profile',
      description: 'Enter a nickname. Enter an email address which will be kept private to FlyingDarts.'
    },
    {
      src: '/assets/registration/video_call.svg',
      title: 'Camera permission',
      description: 'We need permission to access your camera so your dartboard is visible.'
    }
  ];
  constructor(
    private router: Router, 
    public authenticator: AuthenticatorService, 
    private amplifyAuthService: AmplifyAuthService,
    private userProfileStateService: UserProfileStateService,
    private userProfileApiService: UserProfileApiService,
    private webSocketService: WebSocketService) {
      
    this.profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe(x=> {
      if (x.action === WebSocketActions.UserProfileCreate) {
        this.userProfileStateService.currentUserProfileDetails = (x.message as UserProfileDetails);
        this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera']}}])
      }
    })
  }
  async submitForm() {
    console.log(this.profileForm.value);
    var userId = await this.amplifyAuthService.getCognitoUserId();
    if (this.profileForm.valid) {
      this.userProfileApiService.createUserProfile(
        userId,
        this.profileForm.value.email,
        this.profileForm.value.userName,
        this.profileForm.value.country);
    }
      
  }  
}
