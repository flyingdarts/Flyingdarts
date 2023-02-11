import { Injectable } from "@angular/core";
import { Message, WebsocketService } from "./websocket.service";

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private webSocketService: WebsocketService) {

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
        }
        this.webSocketService.messages.next(body);
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
        }
        this.webSocketService.messages.next(body);
    }

    
    roomsOnCreate(roomId: string) {
        var message: RoomCreatedRequest = {
            RoomId: roomId
        };
        let body: Message = {
            action: 'rooms/create',
            message: message
        }
        this.webSocketService.messages.next(body);
    }
}
export interface IRequest {

}
export interface X01ScoreRequest extends IRequest {
    RoomId: string;
    PlayerId: string;
    Score: number;
    Input: number;
}

export interface RoomJoinedRequest extends IRequest {
    RoomId: string;
    PlayerId: string;
    PlayerName: string
}

export interface RoomCreatedRequest extends IRequest {
    RoomId: string;
}

