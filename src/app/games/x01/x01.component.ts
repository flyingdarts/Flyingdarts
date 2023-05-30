import {
  Component, OnInit
} from '@angular/core';
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
  providers: [X01Store]
})
export class X01Component implements OnInit {
  public title: string = "";

  public input: X01Input = new X01Input(0, [0, 0, 0]);

  public vm$: Observable<X01State> = this.componentStore.select(state => state);

  private gameId?: string;
  private clientId?: string;

  constructor(
    private componentStore: X01Store,
    private webSocketService: WebSocketService,
    private authService: AmplifyAuthService,
    private x01ApiService: X01ApiService,
    private route: ActivatedRoute,
    private userProfileService: UserProfileStateService) {
  }

  async ngOnInit() {

    this.gameId = this.route.snapshot.paramMap.get('id')!;
    this.clientId = this.userProfileService.currentUserProfileDetails.UserId!;
    this.componentStore.setState(initialX01State);

    this.webSocketService.connected$.subscribe((connected) => {
      if (connected) {
        this.userProfileService.userName$.subscribe(userName => {
          this.x01ApiService.joinGame(this.gameId!, this.clientId!, userName)
        })
      }
    })
    this.webSocketService.getMessages().subscribe((x) => {
      switch (x.action) {
        case WebSocketActions.X01Join:
          console.log(x.message as JoinGameCommand);
          this.onJoinRoomCommand(x.message as JoinGameCommand);
          this.handleMetadata(x);
          break;
        case WebSocketActions.X01Score:
          this.onScoreCommand(x.message as CreateX01ScoreCommand);
          break;
      }
    });
  }
  private handleMetadata(data: any) { 
    if (!isNullOrUndefined(data.Metadata)) {
      var message = (data.message as JoinGameCommand);
      if (message.PlayerId == this.clientId) {
        var currentPlayers = (message.Metadata["CurrentPlayers"] as JoinGameCommand[])
        console.log(currentPlayers);
      }
    }
  }
  private onJoinRoomCommand(message: JoinGameCommand) {
    this.componentStore.setLoading(false);
    this.title = `Best of ${message.Game!.X01.Sets}/${message.Game!.X01.Legs}`;

    this.componentStore.setPlayerScore(message.Game!.X01.StartingScore)
    this.componentStore.setOpponentScore(message.Game!.X01.StartingScore)

    message.PlayerId == this.clientId
      ? this.componentStore.setPlayerName(message.PlayerName)
      : this.componentStore.setOpponentName(message.PlayerName)

    
  }

  private onScoreCommand(message: CreateX01ScoreCommand) {
    this.componentStore.setLoading(false);

    message.PlayerId == this.clientId
      ? this.componentStore.setPlayerScore(message.Score)
      : this.componentStore.setOpponentScore(message.Score)

    this.resetScore();
  }

  public sendScore() {
    this.componentStore.setLoading(true);
    this.componentStore.playerScore$.pipe(first()).subscribe(score => {
      this.x01ApiService.score(this.gameId!, this.clientId!, score - this.input.Sum, this.input.Sum)
    });
  }

  public resetScore() {
    this.input.reset();
  }

  public onDartboardPressedEvent(input: number) {
    this.input.next(input);
  }
}

