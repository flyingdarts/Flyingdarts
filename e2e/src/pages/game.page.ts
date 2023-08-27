import { BasePage } from "./base.page";

export class GamePage extends BasePage {
    readonly partialUrl = "/x01/638286987074415329";

    protected override getPartialUrl(): string {
        return this.partialUrl;
    }
}