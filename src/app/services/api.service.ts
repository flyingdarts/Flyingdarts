import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private webSocketService: WebsocketService) {

    }

    gamesOnQueue() {

    }

    gamesOnScore(roomId: string, playerId: string, score: number, input: number) {
        var message = `${roomId}#${playerId}#${score}#${input}`;
        let body = {
            action: 'x01/score',
            message: message
        }
        this.webSocketService.messages.next(body);
    }

    roomsOnCreate(roomId: string, playerId: string, playerName: string) {
        var message = `${roomId}#${playerId}#${playerName}`;
        let body = {
            action: 'rooms/create',
            message: message
        }
        this.webSocketService.messages.next(body);
    }

    roomsOnJoin(roomId: string, playerId: string, playerName: string) {
        var message = `${roomId}#${playerId}#${playerName}`;
        let body = {
            action: 'rooms/join',
            message: message
        }
        this.webSocketService.messages.next(body);
    }

    roomsOnLeave() {

    }
    // Games X01 OnQueue
    // Games X01 OnScore
    // Rooms OnCreate
    // Rooms OnJoin
    // Rooms OnLeave
}