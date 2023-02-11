import { Request } from "./../../app/requests/request"

export interface Message<T = Request> {
    action: string;
    message: T;
}
