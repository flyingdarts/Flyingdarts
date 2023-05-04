import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService, private router: Router) { 

  }

  ngOnInit(): void {
    if (!!this.authenticator.user) {
      this.router.navigate(['/'])
    }
  }
}
