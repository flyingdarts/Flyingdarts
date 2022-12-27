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
    window.addEventListener("scroll", function () {

      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const max = (window.pageYOffset * 100) / maxHeight;
      var bar = this.document.getElementById('secretStatusBar')!;
      console.log("max height", maxHeight);
      console.log("max", max);
      console.log("pageyoffset", window.pageYOffset);
      console.log("innerheigt", window.innerHeight);
      console.log("scrolleight", document.body.scrollHeight);
      if (window.pageYOffset > 58) {
        bar!.style.position = "sticky";
        bar!.style.top = "0";
        bar!.style.left = "0";
        bar!.style.zIndex = "1";
        bar!.style.backgroundColor = "white";
        bar!.style.width = "100%";
      } else {
        bar!.style.position = "unset"
      }

    });
  }
  title = 'flyingdarts';
  public signOut(): void {
    Auth.signOut({ global: true });
  }
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}