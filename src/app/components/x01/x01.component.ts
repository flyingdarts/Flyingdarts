import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerLocalStorageService } from '../../services/player.local-storage.service';
import { filter, Subscription } from 'rxjs';
import { JitsiService } from 'src/app/services/jitsi.service';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngrx/store';
import { WebSocketActions } from 'src/app/services/websocket/WebSocketActions';
import { JoinRoomRequest } from 'src/app/services/websocket/requests/JoinRoomRequest';
import { CreateX01ScoreRequest } from 'src/app/services/websocket/requests/CreateX01ScoreRequest';
export interface ScoreRecord {
  score: number;
  input: number;
}
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

    // this.players$ = this.store.pipe(select(X01Players))
    console.log("construct snapshot", this.route.snapshot);

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
          this.playerScores.push({ score: this.player_score, input: message.Input });
          this.player_score = message.Score;
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

    this.apiService.roomsOnJoin(this.route.snapshot.params["id"], this.playerLocalStorageService.getUserId(), this.playerLocalStorageService.getUserName());

    // this.player_score$ = this.store.select('X01', 'home');
    // this.opponent_score$ = this.store.select('X01', 'away');
    // this.player_name$ = this.store.select('X01', 'playerName');
    // this.opponent_name$ = this.store.select('X01', 'opponentName');
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

export class FifoQueue {

}