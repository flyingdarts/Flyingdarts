import { GamesState } from "./games/games.state";
import { UserState } from "./games/user/user.state";

export interface FlyingdartsState {
    userState: UserState;
    gamesState: GamesState;
}