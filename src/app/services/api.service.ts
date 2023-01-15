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

    roomsOnCreate() {

    }

    roomsOnJoin() {

    }

    roomsOnLeave() {

    }
    // Games X01 OnQueue
    // Games X01 OnScore
    // Rooms OnCreate
    // Rooms OnJoin
    // Rooms OnLeave
}