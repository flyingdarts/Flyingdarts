import { Component, OnInit } from '@angular/core';

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
  onProviderAuthBtnClicked(provider: String): void {
    console.log("provider", provider);
  }
}
