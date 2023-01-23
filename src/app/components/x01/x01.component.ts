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
import { AppState, selectX01Away, selectX01Home, setScores, X01State } from './x01.state';
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
  public player_name: string = "Player";
  public player_score$: Observable<number>;
  public player_avg: number = 0;
  public player_total: number = 0;

  public opponent: number[] = [];
  public opponent_name: string = "Opponent";
  public opponent_score$: Observable<number>;
  public opponent_avg: number = 0;
  public opponent_total: number = 0;

  private trigger: Subject<void> = new Subject<void>();
  public webcamHeight = 300;
  public webcamWidth = 300;
  public webcamImage: any;
  public deviceId: String = "";
  private _store: Store<{ X01: { home: number, away: number } }>;
  constructor(
    private webSocketService: WebsocketService,
    private apiService: ApiService,
    private store: Store<{ X01: { home: number, away: number } }>,
    private route: ActivatedRoute,
    private playerLocalStorageService: PlayerLocalStorageService,
    private jitsiService: JitsiService) {
    this._store = store;
    this.player_score$ = this._store.select('X01', 'home');
    this.opponent_score$ = this._store.select('X01', 'away');
    this.player_score$.subscribe(score => {
      this.player_total = score;
    })
    this.opponent_score$.subscribe(score => {
      this.opponent_total = score;
    })
    console.log(store.select(selectX01Home));
  }

  ngOnInit() {
    this.roomSubscription = this.route.params.subscribe(params => {
      this.roomId = params['id']
    })

    this.webSocketService.messages.subscribe((message) => {
      var req = JSON.parse(message.message);
      this.opponent_name = req.message.playerName;
      if (req.message.playerId != this.playerLocalStorageService.getUserId()) {
        var game = { game: { home: this.player_total, away: req.message.score } }
        this._store.dispatch(setScores(game));
      }
      console.log(req);
    })

    this.player_name = this.playerLocalStorageService.getUserName();
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


  dispatchTest() {
    this.apiService.gamesOnScore(this.roomId, this.playerLocalStorageService.getUserId(), this.playerLocalStorageService.getUserName(), this.player_total - this.lastThreeSum, this.lastThreeSum);
    var game = { game: { home: this.player_total - this.lastThreeSum, away: this.opponent_total } }
    this.store.dispatch(setScores(game));
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