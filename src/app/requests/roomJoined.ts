import { Request } from "./request";

export interface RoomJoinedRequest extends Request {
    RoomId: string;
    PlayerId: string;
    PlayerName: string;
}
