import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { JitsiService } from './../../services/jitsi.service';
import { WebSocketService } from './../../infrastructure/websocket/websocket.service';
import { WebSocketActions } from './../../infrastructure/websocket/websocket.actions.enum';
import { CreateX01ScoreCommand } from './../../requests/CreateX01ScoreCommand';
import { JoinGameCommand } from './../../requests/JoinGameCommand';
import { X01ApiService } from './../../services/x01-api.service';
import { AmplifyAuthService } from './../../services/amplify-auth.service';
import { UserProfileStateService } from './../../services/user-profile-state.service';
import { X01State } from 'src/app/state/games/X01/x01.state';
import { ComponentStore } from '@ngrx/component-store';
import { GamesState } from 'src/app/state/games/games.state';
export class InputModel {
  Sum: number;
  Darts: number[];
  constructor(sum: number, darts: number[]) {
    this.Sum = sum;
    this.Darts = darts;
  }

  public input(score: number) {
    if (this.Darts.length == 3) {
      this.Darts = this.Darts.slice(1); // Fifo
      this.Darts.push(score); // Add new dart
      //this.lastThreeString = this.lastThreeInputs.join(' ')
      this.Sum = this.Darts.reduce((a, b) => {
        return a + b;
      });
    }
  }

  public get getString(): string {
    return this.Darts.join(' ');
  }
}
@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss'],
  providers: [ComponentStore]
})
export class X01Component implements OnInit, AfterViewInit {
  public inputShouldBeDisabled: boolean = false;
  public input: InputModel = new InputModel(0, [0, 0, 0]);

  public tableHeader: string = '';

  public playerName: string = 'Player';
  public playerSets: number = 0;
  public playerLegs: number = 0;
  public playerScore: number = 0;
  public playerScores: string[] = [];
  public playerScores$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(this.playerScores);
  public playerHistory$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public playerTotal: number = 0;

  public opponentName: string = 'Opponent';
  public opponentSets: number = 0;
  public opponentLegs: number = 0;
  public opponentScore: number = 0;
  public opponentScores: string[] = [];
  public opponentScores$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.playerScores);
  public opponentHistory$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public opponentTotal: number = 0;

  public clientId: string = '';
  public gameId: string = '';


  constructor(
    private webSocketService: WebSocketService,
    private apiService: X01ApiService,
    private route: ActivatedRoute,
    private userProfileService: UserProfileStateService,
    private authService: AmplifyAuthService,
    private jitsiService: JitsiService,
    private componentStore: ComponentStore<{games: GamesState}>
  ) {

  }

  public readonly x01State$ = this.componentStore.select(state => state.games.x01);

  ngAfterViewInit(): void {
    console.log('test after view init x01 component');
  }

  async ngOnInit() {
    try {
      this.clientId = await this.authService.getCognitoId();
      this.playerName = this.userProfileService.currentUserProfileDetails.UserName;
    } catch {
      console.log('user is not authenticated');
    }
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    if (
      this.gameId != 'testje' &&
      this.gameId != 'test123' &&
      this.gameId != null &&
      this.gameId != undefined
    ) {
      this.jitsiService.namePrincipalRoom = `Flyingdarts ${this.gameId}`;
      this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, false);
      this.jitsiService.user.setName(this.playerName);
    }
    this.webSocketService.connected$.subscribe((connected) => {
      if (connected) {
        // Execute something when connected is true
        this.apiService.joinGame(this.gameId, this.clientId, this.playerName);
      }
    });
    
    this.webSocketService.getMessages().subscribe((x) => {
      console.log(x);
      switch (x.action) {
        case WebSocketActions.X01Join:
          this.onJoinRoomCommand(x);
          break;
        case WebSocketActions.X01Score:
          this.onScoreCommand(x);
          break;
      }
    });
  }
  insertPlayerScore(score: string) {

  }
  insertOpponentScore(score: string) {

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
    console.log('Received join room command', message);
    console.log(message.Game);
    this.tableHeader = `Best of ${message.Game!.X01.Sets}/${
      message.Game!.X01.Legs
    }`;
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
    console.log('Received x01 score request', message);
    if (message.PlayerId == this.clientId) {
      this.playerScore = message.Score;
      this.insertPlayerScore(message.Input.toString());
    } else {
      this.opponentScore = message.Score;
      this.insertOpponentScore(message.Input.toString());
    }
    this.resetInput();
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
