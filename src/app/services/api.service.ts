import { Injectable } from "@angular/core";
import { CreateRoomRequest } from "../websocket/requests/rooms/rooms.create.request";
import { JoinRoomRequest } from "../websocket/requests/rooms/rooms.join.request";
import { CreateX01ScoreRequest } from "../websocket/requests/x01/x01-score.request";
import { WebSocketActions } from "../infrastructure/websocket/websocket.actions.enum";
import { WebSocketService } from "./websocket.service";
import { WebSocketMessage } from "../infrastructure/websocket/websocket.message.model";


@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private webSocketService: WebSocketService) {

    }

    gamesOnScore(roomId: string, playerId: string, score: number, input: number) {
        var message: CreateX01ScoreRequest = {
            RoomId: roomId,
            PlayerId: playerId,
            Score: score,
            Input: input
        };
        let body: WebSocketMessage<CreateX01ScoreRequest> = {
            action: WebSocketActions.X01OnScore,
            message: message
        };
        console.log(body);
        this.webSocketService.postMessage(JSON.stringify(body));
    }

    roomsOnJoin(roomId: string, playerId: string, playerName: string) {
        var message: JoinRoomRequest = {
            RoomId: roomId,
            PlayerId: playerId,
            PlayerName: playerName
        };
        let body: WebSocketMessage<JoinRoomRequest> = {
            action: WebSocketActions.RoomsOnJoin,
            message: message
        };
        console.log(body);
        this.webSocketService.postMessage(JSON.stringify(body));
    }

    roomsOnCreate(roomId: string) {
        var message: CreateRoomRequest = {
            RoomId: roomId
        };
        let body: WebSocketMessage<CreateRoomRequest> = {
            action: WebSocketActions.RoomsOnCreate,
            message: message
        };
        console.log(body);
        this.webSocketService.postMessage(JSON.stringify(body));
    }
}

