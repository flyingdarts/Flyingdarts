import { Component, OnInit } from '@angular/core';
import { AuthFormFields } from '@aws-amplify/ui';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public loginEndpoint = ""

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
