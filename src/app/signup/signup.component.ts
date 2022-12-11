import { Component, OnInit } from '@angular/core';
import { AuthFormFields } from '@aws-amplify/ui';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
