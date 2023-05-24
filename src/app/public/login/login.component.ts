import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileStateService } from 'src/app/services/user-profile-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private stateService: UserProfileStateService, private router: Router) {

  }
  ngOnInit() {
    if (this.stateService.currentUserProfileDetails == null) {
      this.stateService.currentUserProfileDetails = {
        isRegistered: false,
        cameraPermissionGranted: false,
        Id: '',
        UserName: '',
        Country: '',
        Email: ''
      }
    } else if (!this.stateService.currentUserProfileDetails.isRegistered!) {
      this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile'] } }])
    } else if (this.stateService.currentUserProfileDetails.isRegistered! && !this.stateService.currentUserProfileDetails.cameraPermissionGranted!) {
      this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera'] } }])
    }
  }
}
