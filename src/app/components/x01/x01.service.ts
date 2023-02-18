import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class X01Service {

  constructor() {

  }

  getPlayers(): Observable<Player[]> {
    const players = [
      { id: "1", name: "Pablo" },
      { id: "2", name: "Escobar" },
    ];
    return of(players).pipe(delay(2000));
  }
}

export class Player {
  id: string = ""
  name: string = ""
}