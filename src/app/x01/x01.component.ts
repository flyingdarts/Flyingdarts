import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit, OnDestroy {
  public inviteLink: string = ''
  public scoreActionButtonText = 'NO SCORE'
  public content = '';
  public player: Number[] = [];
  public opponent: Number[] = [];
  public player_score: Number = 501;
  public opponent_score: Number = 501;
  public player_avg: Number = 0;
  public opponent_avg: Number = 0;
  public currentInput: Number = 0;
  constructor(
    private webSocketService: WebsocketService,
    private route: ActivatedRoute,
    private router: Router) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
      if (JSON.parse(msg.message).action == "x01/score-updated") {
        if (sessionStorage.getItem("playerId") == JSON.parse(msg.message).message.split('#')[0]) {
          this.player.push(JSON.parse(msg.message).message.split('#')[1]);
          this.player_score = Number(this.player_score) - Number(JSON.parse(msg.message).message.split('#')[1]);
          var sum: number = 0;
          for (var i = 0; i < this.player.length; i++) {
            sum = sum + Number(this.player[i])
          }
          console.log("Sum", sum);
          console.log("Length", this.player.length);
          this.player_avg = sum / this.player.length;

        } else {
          this.opponent.push(JSON.parse(msg.message).message.split('#')[1]);
          this.opponent_score = Number(this.opponent_score) - Number(JSON.parse(msg.message).message.split('#')[1]);
          var sum: number = 0;
          for (var i = 0; i < this.opponent.length; i++) {
            sum = sum + Number(this.opponent[i])
          }

          console.log("Sum", sum);
          console.log("Length", this.opponent.length);
          this.opponent_avg = sum / this.opponent.length;
        }
      }
    })
  }

  ngOnInit(): void {


  }
  ngOnDestroy(): void {
    window.removeEventListener("scroll", () => { });
  }
  sendScore(input?: number) {
    if (input! >= 0 && input! <= 9) {
      this.currentInput = Number(`${this.currentInput}${input!}`)
      this.scoreActionButtonText = 'OK';
      return
    }
    let body = {
      action: 'x01/score',
      message: `${this.route.snapshot.params["roomId"]}#${sessionStorage.getItem('playerId')}#${this.player_score}#${input}`
    }
    this.webSocketService.messages.next(body)
  }

  clearInput() {
    this.currentInput = 0;
    this.scoreActionButtonText = "NO SCORE";
  }

  scoreAction() {
    this.sendScore(Number(this.currentInput));
    this.currentInput = 0;
    this.scoreActionButtonText = "NO SCORE"
  }
}
