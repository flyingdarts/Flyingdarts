import { Injectable } from "@angular/core";
import { Message, WebsocketService } from "./websocket.service";

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private webSocketService: WebsocketService) {

    }

    gamesOnScore(roomId: string, playerId: string, playerName: string, score: number, input: number) {
        var message: X01ScoreRequest = {
            roomId,
            playerId,
            playerName,
            score,
            input
        };
        let body: Message = {
            action: 'x01/score',
            message: message
        }
        this.webSocketService.messages.next(body);
    }

    roomsOnJoin(roomId: string, playerId: string, playerName: string) {
        var message: RoomJoinedRequest = {
            roomId,
            playerId,
            playerName
        };
        let body: Message = {
            action: 'rooms/join',
            message: message
        }
        this.webSocketService.messages.next(body);
    }
}
export interface IRequest {

}
export interface X01ScoreRequest extends IRequest {
    roomId: string;
    playerId: string;
    playerName: string;
    score: number;
    input: number;
}

export interface RoomJoinedRequest extends IRequest {
    roomId: string;
    playerId: string;
    playerName: string
}

