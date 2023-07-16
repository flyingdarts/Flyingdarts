import { Component, OnInit } from '@angular/core';
import { X01State, initialX01State } from './x01.state';
import { X01Store } from './x01.store';
import { Observable, first } from 'rxjs';
import { X01Input } from './x01.input';
import { WebSocketService } from 'src/app/infrastructure/websocket/websocket.service';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { JoinGameCommand } from 'src/app/requests/JoinGameCommand';
import { CreateX01ScoreCommand } from 'src/app/requests/CreateX01ScoreCommand';
import { X01ApiService } from 'src/app/services/x01-api.service';
import { ActivatedRoute } from '@angular/router';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileStateService } from 'src/app/services/user-profile-state.service';
import { isNullOrUndefined } from 'src/app/app.component';

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss'],
  providers: [X01Store],
})
export class X01Component implements OnInit {
  public title: string = '';

  public input: X01Input = new X01Input(0, [0, 0, 0]);

  public vm$: Observable<X01State> = this.componentStore.select(
    (state) => state
  );

  private gameId?: string;

  public clientId?: string;
  public shouldDisableInput: boolean = false;
  
  constructor(
    private componentStore: X01Store,
    private webSocketService: WebSocketService,
    private authService: AmplifyAuthService,
    private x01ApiService: X01ApiService,
    private route: ActivatedRoute,
    private userProfileService: UserProfileStateService
  ) {}

  async ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    this.clientId = this.userProfileService.currentUserProfileDetails.UserId!;
    this.componentStore.setState(initialX01State);

    this.webSocketService.connected$.subscribe((connected) => {
      if (connected) {
        this.userProfileService.userName$.subscribe((userName) => {
          this.x01ApiService.joinGame(this.gameId!, this.clientId!, userName);
        });
      }
    });
    this.webSocketService.getMessages().subscribe((x) => {
      switch (x.action) {
        case WebSocketActions.X01Join:
          this.onJoinRoomCommand(x.message as JoinGameCommand);
          this.handleMetadata(x.message as JoinGameCommand);
          break;
        case WebSocketActions.X01Score:
          this.onScoreCommand(x.message as CreateX01ScoreCommand);
          break;
      }
    });
  }
  private handleMetadata(data: JoinGameCommand) {
    var metadata = data.Metadata;
    if (!isNullOrUndefined(metadata)) {
      var currentPlayers = metadata.CurrentPlayers as JoinGameCommand[];
      console.log('current players', currentPlayers);
      for (var i = 0; i < currentPlayers.length; i++) {
        currentPlayers[i].PlayerId == this.clientId
          ? this.componentStore.setPlayerName(currentPlayers[i].PlayerName)
          : this.componentStore.setOpponentName(currentPlayers[i].PlayerName);
      }
    }
  }
  private onJoinRoomCommand(message: JoinGameCommand) {
    this.componentStore.setLoading(false);
    this.title = `Best of ${message.Game!.X01.Sets}/${message.Game!.X01.Legs}`;

    this.componentStore.setPlayerScore(message.Game!.X01.StartingScore);
    this.componentStore.setOpponentScore(message.Game!.X01.StartingScore);

    if (message.PlayerId == this.clientId) {
      this.componentStore.setPlayerName(message.PlayerName);
      if (!isNullOrUndefined(message.History)) {
        this.componentStore.setPlayerHistory(
          message.History![message.PlayerId]
        );
      }
    } else {
      this.componentStore.setOpponentName(message.PlayerName);
      if (!isNullOrUndefined(message.History)) {
        this.componentStore.setOpponentHistory(
          message.History![message.PlayerId]
        );
      }
    }
  }

  private onScoreCommand(message: CreateX01ScoreCommand) {
    this.componentStore.setLoading(false);

    if (message.PlayerId == this.clientId) {
      this.componentStore.setPlayerScore(message.Score);
      this.componentStore.setPlayerHistory(
        message.History![message.PlayerId]
      );
    } else {
      this.componentStore.setOpponentScore(message.Score);
      this.componentStore.setOpponentHistory(
        message.History![message.PlayerId]
      );
    }
    this.shouldDisableInput = message.PlayerId == this.clientId;

    this.resetScore();
  }

  public sendScore() {
    this.componentStore.setLoading(true);
    this.componentStore.playerScore$.pipe(first()).subscribe((score) => {
      const newScore = score - this.input.Sum;

      if (newScore >= 0) {
        this.x01ApiService.score(
          this.gameId!,
          this.clientId!,
          newScore,
          this.input.Sum
        );
        this.shouldDisableInput = true;
      } else {
        // Handle invalid score here (e.g., show an error message)
        console.log('Invalid score: Cannot go below 0');
      }
    });
  }

  public resetScore() {
    this.input.reset();
  }

  public onDartboardPressedEvent(input: number) {
    this.input.next(input);
  }
}
