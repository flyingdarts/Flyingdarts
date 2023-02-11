import { Request } from "./request";

export interface RoomCreatedRequest extends Request {
    RoomId: string;
}
