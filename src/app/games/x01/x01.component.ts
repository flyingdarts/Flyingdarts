import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { isNullOrUndefined } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { JitsiService } from 'src/app/services/jitsi.service';
import { PlayerLocalStorageService } from 'src/app/services/player.local-storage.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { JoinRoomRequest } from 'src/app/websocket/requests/rooms/rooms.join.request';
import { CreateX01ScoreRequest } from 'src/app/websocket/requests/x01/x01-score.request';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit {

  public roomId: string = '';
  public roomSubscription?: Subscription;
  public inviteLink: string = ''
  public scoreActionButtonText = 'NO SCORE'
  public content = '';
  public currentInput: number = 0;
  public lastThreeInputs: number[] = [0, 0, 0];
  public lastThreeString: string = "0 0 0";
  public lastThreeSum: number = 0;

  public player: number[] = [];
  public player_name: string = "Pajeet";
  public player_score: number = 0;
  public player_avg: number = 0;
  public player_total: number = 0;
  public playerScores: ScoreRecord[] = [];

  public opponent: number[] = [];
  public opponent_name: string = "Punjabi";
  public opponent_score: number = 0;
  public opponent_avg: number = 0;
  public opponent_total: number = 0;
  public opponentScores: ScoreRecord[] = [];

  public webcamHeight = 300;
  public webcamWidth = 300;
  public webcamImage: any;
  public deviceId: String = "";

  // public players$: Observable<Player[]>
  constructor(
    private webSocketService: WebSocketService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private playerLocalStorageService: PlayerLocalStorageService,
    private jitsiService: JitsiService) {

    let roomId = this.route.snapshot.params["id"];
    let userId = this.playerLocalStorageService.getUserId();
    let userName = this.playerLocalStorageService.getUserName();
    if (!isNullOrUndefined(roomId) && !isNullOrUndefined(userId) && !isNullOrUndefined(userName)) {
      console.log("ngOnInit with params for room join", roomId, userId, userName);
      this.apiService.roomsOnJoin(roomId, userId, userName);
    }
  }

  ngOnInit() {
    this.roomSubscription = this.route.params.subscribe(params => {
      this.roomId = params['id']
    })
    this.player_score = 501
    this.opponent_score = 501
    this.player_total = 501
    this.opponent_total = 501

    this.webSocketService.getMessages()
      .pipe(filter(x => x.action === WebSocketActions.RoomsOnJoin))
      .subscribe(x => {
        let message: JoinRoomRequest = x.message as JoinRoomRequest;
        console.log("Received join room request", message);
        if (message.PlayerId == this.playerLocalStorageService.getUserId()) {
          this.player_name = message.PlayerName;
        } else {
          this.opponent_name = message.PlayerName;
        }
      });
    this.webSocketService.getMessages()
      .pipe(filter(x => x.action === WebSocketActions.X01OnScore))
      .subscribe(x => {
        let message: CreateX01ScoreRequest = x.message as CreateX01ScoreRequest;
        console.log("Received x01 score request", message);
        if (message.PlayerId == this.playerLocalStorageService.getUserId()) {
          if (this.playerScores.filter(x => x.score == message.Input + message.Score).length == 1) {

          } else {
            this.playerScores.push({ score: this.player_score, input: message.Input });
            this.player_score = message.Score;
          }
        } else {
          this.opponentScores.push({ score: this.opponent_score, input: message.Input });
          this.opponent_score = message.Score;
        }
      })

    var view = document.getElementById("webcamView");
    this.webcamHeight = view?.clientHeight!;
    this.webcamWidth = view?.clientWidth!;

    this.jitsiService.namePrincipalRoom = `Flyingdarts ${this.roomId}`;
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, false);
    this.jitsiService.user.setName(this.playerLocalStorageService.getUserName());

    console.log("on init snapshot", this.route.snapshot);
  }

  dartBoardInput(input: number) {
    if (this.lastThreeInputs.length == 3) {
      this.lastThreeInputs = this.lastThreeInputs.slice(1)
    }
    this.lastThreeInputs.push(input);
    this.lastThreeString = this.lastThreeInputs.join(' ')
    this.lastThreeSum = this.lastThreeInputs.reduce((a, b) => {
      return a + b
    })
    this.currentInput = input;
  }

  executeCommand(data: any) {
    console.log(
      'this.jitsiService.getParticipants():',
      this.jitsiService.getParticipants()
    );

    this.jitsiService.api.executeCommand(
      'sendEndpointTextMessage',
      this.jitsiService.getParticipants(),
      'mover a principal'
    );
  }

  sendScore() {
    this.apiService.gamesOnScore(this.roomId, this.playerLocalStorageService.getUserId(), this.player_score - this.lastThreeSum, this.lastThreeSum);
    this.resetInput()
  }

  resetInput() {
    this.lastThreeInputs = [0, 0, 0];
    this.lastThreeString = "0 0 0";
    this.lastThreeSum = 0;
  }

  // sendScore(input?: number) {
  //   if (input! >= 0 && input! <= 9) {
  //     this.currentInput = Number(`${this.currentInput}${input!} `)
  //     this.scoreActionButtonText = 'OK';
  //     return
  //   }
  //   this.apiService.gamesOnScore(
  //     this.route.snapshot.params["roomId"],
  //     sessionStorage.getItem("playerId")!,
  //     this.player_score,
  //     input!
  //   );
  // }

  // clearInput() {
  //   this.currentInput = 0;
  //   this.scoreActionButtonText = "NO SCORE";
  // }

  // scoreAction() {
  //   this.sendScore(Number(this.currentInput));
  //   this.currentInput = 0;
  //   this.scoreActionButtonText = "NO SCORE"
  // }
}

export interface ScoreRecord {
  score: number;
  input: number;
}