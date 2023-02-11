import { Request } from "./request";

export interface X01ScoreRequest extends Request {
    RoomId: string;
    PlayerId: string;
    Score: number;
    Input: number;
}
