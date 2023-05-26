import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Hub } from "aws-amplify";
import { tap } from "rxjs";
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  listenForAuthEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.listenForAuthEvents),
      tap(() => {
        Hub.listen('auth', ({ payload: { event } }) => {
          switch (event) {
            case 'signIn':
              // Dispatch an action or call a method to handle the user login event
              console.log('ti signin hallo')
              break;
            case 'signOut':
              // Dispatch an action or call a method to handle the user sign out event
              console.log('ti signout hallo')
              break;
            // Add more event cases as needed
            default:
              break;
          }
        });
      })
    ),
    { dispatch: false } // Set dispatch to false to prevent re-dispatching actions
  );

  constructor(private actions$: Actions) {}
}
