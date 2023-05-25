import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileStateService } from 'src/app/services/user-profile-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private stateService: UserProfileStateService, 
    private authService: AmplifyAuthService,
    private router: Router) {

  }
  async ngOnInit() {
    
  }
}
