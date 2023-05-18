import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { JitsiService } from 'src/app/services/jitsi.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { CreateX01ScoreCommand } from 'src/app/requests/CreateX01ScoreCommand';
import { JoinGameCommand } from 'src/app/requests/JoinGameCommand';
import { X01ApiService } from 'src/app/services/api/x01-api.service';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
export class InputModel {
  Sum: number;
  Darts: number[];
  constructor(sum: number, darts: number[]) {
    this.Sum = sum;
    this.Darts = darts;
  }

  public input(score: number) {
    if (this.Darts.length == 3) {
      this.Darts = this.Darts.slice(1) // Fifo 
      this.Darts.push(score); // Add new dart
      //this.lastThreeString = this.lastThreeInputs.join(' ')
      this.Sum = this.Darts.reduce((a, b) => { return a + b })
    }
  }

  public get getString(): string {
    return this.Darts.join(' ');
  }
}
@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit, AfterViewInit {
  public inputShouldBeDisabled: boolean = false;
  public input: InputModel = new InputModel(0, [0,0,0]);

  public tableHeader: string = "";

  public playerName: string = "Player";
  public playerSets: number = 0;
  public playerLegs: number = 0;
  public playerScore: number = 0;
  public playerScores: string[] = [];
  public playerScores$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.playerScores);
  public playerHistory$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public playerTotal: number = 0;

  public opponentName: string = "Opponent";
  public opponentSets: number = 0;
  public opponentLegs: number = 0;
  public opponentScore: number = 0;
  public opponentScores: string[] = [];
  public opponentScores$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.playerScores);
  public opponentHistory$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public opponentTotal: number = 0;

  public clientId: string = "";
  public gameId: string = "";

  constructor(
    private webSocketService: WebSocketService,
    private apiService: X01ApiService,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private authService: AmplifyAuthService,
    private jitsiService: JitsiService) {
  }
  ngAfterViewInit(): void {
    console.log("test after view init x01 component");
  }

  async ngOnInit() {
    console.log("test init x01 component");
    this.clientId =  await this.authService.getCognitoId();
    this.playerName = this.userProfileService.currentUserProfileDetails.UserName;
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    this.webSocketService.connected$.subscribe(connected => {
      if (connected) {
        // Execute something when connected is true
        console.log("Connected to WebSocket!");
        this.apiService.joinGame(this.gameId, this.clientId, this.playerName)
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
    this.tableHeader = `Best of ${message.Game!.X01.Sets}/${message.Game!.X01.Legs}`
    if (message.PlayerId == this.clientId) {
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
    if (message.PlayerId ==this.clientId) {
        this.playerScore = message.Score;
        this.insertPlayerScore(message.Input.toString())
    } else {
      this.opponentScore = message.Score;
      this.insertOpponentScore(message.Input.toString())
    }
    this.resetInput()
  }

  dartBoardInput(input: number) {
    this.input.input(input);
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
    this.apiService.score(this.gameId, this.clientId, this.playerScore - this.input.Sum, this.input.Sum);
    this.inputShouldBeDisabled = !this.inputShouldBeDisabled;
  }

  resetInput() {
    this.input.Darts = [0, 0, 0];
    this.input.Sum = 0;
  }
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