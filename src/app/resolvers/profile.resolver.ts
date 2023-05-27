import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WebSocketService } from '../infrastructure/websocket/websocket.service';
import { AppStore } from '../app.store';
import { WebSocketActions } from '../infrastructure/websocket/websocket.actions.enum';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<boolean> {
  constructor(private webSocketService: WebSocketService, private appStore: AppStore, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const profileSubscription = this.webSocketService.getMessages().subscribe(x=> {
        if (x.action === WebSocketActions.UserProfileGet) {
          observer.next(true);
          observer.complete();
        }
      });
      return () => {
        profileSubscription.unsubscribe();
      };
    })
  }
}
