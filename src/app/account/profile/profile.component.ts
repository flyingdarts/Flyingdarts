import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingApiService } from 'src/app/services/onboarding-api.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { CarouselModel } from 'src/app/shared/carousel/carousel.component';
import { UserProfileDetails } from 'src/app/shared/models/user-profile-details.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
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
  constructor(private formBuilder: FormBuilder, 
    private apiService: OnboardingApiService,
    private authService: AmplifyAuthService,
    private webSocketService: WebSocketService) { 
    this.profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
   }

  async ngOnInit(){
    this.apiService.getUserProfile(await this.authService.getCognitoUserId());

    this.webSocketService.getMessages().subscribe(x=> {
      if (x.action === WebSocketActions.UserProfileGet) {
        this.initForm(x.message as UserProfileDetails);
      }
    })
  }
  initForm(preloadedData: UserProfileDetails) {
    this.profileForm = this.formBuilder.group({
      userName: preloadedData.UserName || '',
      country: preloadedData.Country || '',
      email: preloadedData.Email || '',
    });
  }

  updateProfile() {
    console.log({})
  }
}
