
export interface WebSocketRequest {
}
export interface MessageRequest extends WebSocketRequest {
    date: Date;
    message: string;
    owner: string;
}