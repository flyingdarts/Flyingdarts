import { GamesState } from "./games/games.state";
import { UserState } from "./user/user.state";

export interface FlyingdartsState {
    userState: UserState;
    gamesState: GamesState;
}