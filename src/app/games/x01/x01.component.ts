import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { JitsiService } from 'src/app/services/jitsi.service';
import { PlayerLocalStorageService } from 'src/app/services/player.local-storage.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { CreateX01ScoreCommand } from 'src/app/requests/CreateX01ScoreCommand';
import { JoinGameCommand } from 'src/app/requests/JoinGameCommand';
import { X01ApiService } from 'src/app/services/api/x01-api.service';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit, OnDestroy, AfterViewInit {
  public inputShouldBeDisabled: boolean = false;
  public gameId: string = '';
  public roomSubscription?: Subscription;
  public inviteLink: string = ''
  public scoreActionButtonText = 'NO SCORE'
  public content = '';
  public currentInput: number = 0;
  public lastThreeInputs: number[] = [0, 0, 0];
  public lastThreeString: string = "0 0 0";
  public lastThreeSum: number = 0;

  public player: number[] = [];

  public table_header: string = "";

  public playerName: string = "Pajeet";
  public playerSets: number = 0;
  public playerLegs: number = 0;
  public playerScore: number = 0;
  public playerScores: string[] = [];
  public playerScores$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.playerScores);
  public playerHistory$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public playerTotal: number = 0;

  public opponentName: string = "Punjabi";
  public opponentSets: number = 0;
  public opponentLegs: number = 0;
  public opponentScore: number = 0;
  public opponentScores: string[] = [];
  public opponentScores$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.playerScores);
  public opponentHistory$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public opponentTotal: number = 0;


  public player_id: string = ""
  public player_avg: number = 0;



  public opponent: number[] = [];
  public opponent_avg: number = 0;

  public webcamHeight = 300;
  public webcamWidth = 300;
  public webcamImage: any;
  public deviceId: String = "";
  public screenWidth: number = 0;
  public screenHeight: number = 0;
  private resizeTimer: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      var jitsiFrameWidth = document.getElementById("jitsi-iframe")?.offsetWidth;
      var jitsiFrameHeight = document.getElementById("jitsi-iframe")?.offsetHeight;
      console.log(`Available screen size: ${ this.screenWidth }px x ${ this.screenHeight }px`)
      console.log(`Available jitsi size: ${ jitsiFrameWidth }px x ${ jitsiFrameHeight }px`)
    }, 1000)
  }
  // public players$: Observable<Player[]>
  constructor(
    private webSocketService: WebSocketService,
    private apiService: X01ApiService,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private authService: AmplifyAuthService,
    private jitsiService: JitsiService) {
    // Initialize screen size on component initialization
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  ngAfterViewInit(): void {
    console.log("test after view init x01 component");
  }

  async ngOnInit() {
    console.log("test init x01 component");
    this.player_id =  await this.authService.getCognitoId();
    this.playerName = this.userProfileService.currentUserProfileDetails.UserName;
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    this.webSocketService.connected$.subscribe(connected => {
      if (connected) {
        // Execute something when connected is true
        console.log("Connected to WebSocket!");
        this.apiService.joinGame(this.gameId, this.player_id, this.playerName)
      }
    });

    this.webSocketService.getMessages().subscribe(x => {
      console.log(x);
      switch (x.action) {
        case WebSocketActions.X01Join:
          this.onJoinRoomCommand(x);
          break;
        case WebSocketActions.X01Score:
          this.onScoreCommand(x)
          break;
      }
    })

    var view = document.getElementById("webcamView");
    this.webcamHeight = view?.clientHeight!;
    this.webcamWidth = view?.clientWidth!;

    this.jitsiService.namePrincipalRoom = `Flyingdarts ${this.gameId}`;
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, false);
    this.jitsiService.user.setName(this.playerName);
  }
  insertPlayerScore(score: string) {
    this.playerScores.push(score);
    this.playerScores$.next(this.playerScores);
    this.updatePlayerHistory();
  }
  insertOpponentScore(score: string) {
    this.playerScores.push(score);
    this.playerScores$.next(this.playerScores);
    this.updateOpponentHistory();
  }
  private updatePlayerHistory() {
    this.playerHistory$.next(this.playerScores.join(', '));
  }
  private updateOpponentHistory() {
    this.opponentHistory$.next(this.playerScores.join(', '));
  }
  onJoinRoomCommand(x: any) {
    this.inputShouldBeDisabled = false;
    let message: JoinGameCommand = x.message as JoinGameCommand;
    console.log("Received join room command", message);
    console.log(message.Game);
    this.table_header = `Best of ${message.Game!.X01.Sets}/${message.Game!.X01.Legs}`
    if (message.PlayerId == this.player_id) {
      this.playerName = message.PlayerName;
      this.playerScore = message.Game!.X01.StartingScore;
    } else {
      this.opponentName = message.PlayerName;
      this.opponentScore = message.Game!.X01.StartingScore;
    }
  }

  onScoreCommand(x: any) {
    this.inputShouldBeDisabled = !this.inputShouldBeDisabled;
    let message: CreateX01ScoreCommand = x.message as CreateX01ScoreCommand;
    console.log("Received x01 score request", message);
    if (message.PlayerId ==this.player_id) {
        this.playerScore = message.Score;
        this.insertPlayerScore(message.Input.toString())
    } else {
      this.opponentScore = message.Score;
      this.insertOpponentScore(message.Input.toString())
    }
    this.resetInput()
  }

  ngOnDestroy() {
    clearTimeout(this.resizeTimer);
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
    this.apiService.score(this.gameId, this.player_id, this.playerScore - this.lastThreeSum, this.lastThreeSum);
    this.inputShouldBeDisabled = !this.inputShouldBeDisabled;
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

export interface Game {
  X01: X01;
}

export interface X01 {
  DoubleIn: boolean;
  DoubleOut: boolean;
  Legs: number;
  Sets: number;
  StartingScore: number;
}