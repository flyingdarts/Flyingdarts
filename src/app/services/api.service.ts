import { Injectable } from "@angular/core";
import { RoomCreatedRequest } from "../requests/roomCreated";
import { RoomJoinedRequest } from "../requests/roomJoined";
import { X01ScoreRequest } from "../requests/x01Score";
import { Message } from "./message";
import { WebSocketService } from "./websocket.service";


@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private webSocketService: WebSocketService) {

    }

    gamesOnScore(roomId: string, playerId: string, score: number, input: number) {
        var message: X01ScoreRequest = {
            RoomId: roomId,
            PlayerId: playerId,
            Score: score,
            Input: input
        };
        let body: Message = {
            action: 'x01/score',
            message: message
        };
        console.log(body);
        this.webSocketService.postMessage(JSON.stringify(body));
    }

    roomsOnJoin(roomId: string, playerId: string, playerName: string) {
        var message: RoomJoinedRequest = {
            RoomId: roomId,
            PlayerId: playerId,
            PlayerName: playerName
        };
        let body: Message = {
            action: 'rooms/join',
            message: message
        };
        console.log(body);
        this.webSocketService.postMessage(JSON.stringify(body));
    }

    roomsOnCreate(roomId: string) {
        var message: RoomCreatedRequest = {
            RoomId: roomId
        };
        let body: Message = {
            action: 'rooms/create',
            message: message
        };
        console.log(body);
        this.webSocketService.postMessage(JSON.stringify(body));
    }
}

