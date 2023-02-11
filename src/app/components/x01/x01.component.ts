import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerLocalStorageService } from '../../services/player.local-storage.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { JitsiService } from 'src/app/services/jitsi.service';
import { ApiService, X01ScoreRequest } from 'src/app/services/api.service';
import { Store } from '@ngrx/store';
import { AppState, selectX01Away, selectX01Home, setOpponentName, setOpponentScore, setPlayerName, setPlayerScore, X01State } from './x01.state';
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
  public player_name$: Observable<string | undefined>;
  public player_score$: Observable<number | undefined>;
  public player_avg: number = 0;
  public player_total: number = 0;

  public opponent: number[] = [];
  public opponent_name$: Observable<string | undefined>;
  public opponent_score$: Observable<number | undefined>;
  public opponent_avg: number = 0;
  public opponent_total: number = 0;

  private trigger: Subject<void> = new Subject<void>();
  public webcamHeight = 300;
  public webcamWidth = 300;
  public webcamImage: any;
  public deviceId: String = "";
  constructor(
    private webSocketService: WebsocketService,
    private apiService: ApiService,
    private store: Store<{ X01: X01State }>,
    private route: ActivatedRoute,
    private playerLocalStorageService: PlayerLocalStorageService,
    private jitsiService: JitsiService) {
    this.player_score$ = this.store.select('X01', 'home');
    this.opponent_score$ = this.store.select('X01', 'away');
    this.player_name$ = this.store.select('X01', 'playerName');
    this.opponent_name$ = this.store.select('X01', 'opponentName');
    console.log(store.select(selectX01Home));
  }

  ngOnInit() {
    this.roomSubscription = this.route.params.subscribe(params => {
      this.roomId = params['id']
    })

    this.webSocketService.messages.subscribe((message) => {
      var game: any = {}
      if (message.action === "room/on-join") {
        if (message.message["PlayerId"] == this.playerLocalStorageService.getUserId()) {
          game = { game: { playerName: message.message["PlayerName"] }}
          this.store.dispatch(setPlayerName(game));
        } else {
          game = { game: { oppnentName: message.message["PlayerName"] }}
          this.store.dispatch(setOpponentName(game));
        }
      } else if (message.action === "x01/on-score") {
        if (message.message["PlayerId"] == this.playerLocalStorageService.getUserId()) {
          game = { game: { playerScore: message.message["Score"] }}
          this.store.dispatch(setPlayerScore(game));
        } else {
          game = { game: { opponentScore: message.message["Score"] }}
          this.store.dispatch(setOpponentScore(game));
        }
      }
    })
    
    var view = document.getElementById("webcamView");
    this.webcamHeight = view?.clientHeight!;
    this.webcamWidth = view?.clientWidth!;

    this.jitsiService.namePrincipalRoom = `Flyingdarts ${this.roomId}`;
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, false);
    this.jitsiService.user.setName(this.playerLocalStorageService.getUserName());

    this.apiService.roomsOnJoin(this.route.snapshot.params["id"], this.playerLocalStorageService.getUserId(), this.playerLocalStorageService.getUserName());

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
    this.apiService.gamesOnScore(this.roomId, this.playerLocalStorageService.getUserId(), this.player_total - this.lastThreeSum, this.lastThreeSum);
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