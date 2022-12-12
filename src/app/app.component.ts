import { Component } from '@angular/core';
import { AuthFormFields } from '@aws-amplify/ui';
import { Auth, I18n } from 'aws-amplify';

const authScreenLabels = {
  nl: {
    'Change Password': 'wachtwoord wijzigen',
    'Sign in': 'aanmelden',
    'Forgot your password?': 'Wachtwoord vergeten?',
    'Send Code': 'wachtwoord herstellen',
    'Back to Sign In': 'Terug naar aanmeldingsscherm',
    'Reset your password': '',
    'Resend Code': 'Code opnieuw versturen',
    'Your passwords must match': 'De wachtwoorden komen niet overeen',
    'Incorrect username or password.': 'Ongeldige gebruikersnaam en/of wachtwoord',
  },
};
I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flyingdarts';
  public signOut(): void {
    Auth.signOut({ global: true });
  }
  public signInFormFields: AuthFormFields = {
    signIn: {
      username: {
        isRequired: true,
        autocomplete: 'email',
        labelHidden: true,
        order: 1,
        placeholder: 'E-mailadres',
      },
      password: {
        isRequired: true,
        labelHidden: true,
        order: 2,
        placeholder: 'Password',
      },
    }
  };
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}