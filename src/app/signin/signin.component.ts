import { Component, OnInit } from '@angular/core';
import { AuthFormFields } from '@aws-amplify/ui';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public signInFormFields: AuthFormFields = {
    signIn: {

    },
    forceNewPassword: {

    },
    confirmResetPassword: {

    },
    resetPassword: {

    },
  };
}
