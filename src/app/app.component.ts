import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormFields } from '@aws-amplify/ui';
import { Auth } from 'aws-amplify';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roomId?: string | null;
  private playerId?: string | null;

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.playerId = uuidv4();
    sessionStorage.setItem("playerId", this.playerId!)

    this.roomId = sessionStorage.getItem("roomId")
    if (!isNullOrUndefined(this.roomId)) {
      this.router.navigate(['x01', this.roomId])
    }
  }
  title = 'flyingdarts';
  public signOut(): void {
    Auth.signOut({ global: true });
  }
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}