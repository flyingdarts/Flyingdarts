import { ElementFinder, by, element } from "protractor";
import { BasePage } from "./base.page";

export class PublicPage extends BasePage {
    readonly partialUrl: string = ""

    protected override getPartialUrl(): string {
        return this.partialUrl;
    }

    private tosField: ElementFinder= element(by.id("tos-link"));
    private ppField: ElementFinder= element(by.id("pp-link"));

    async clickTos() {
        await this.tosField.click();
    }

    async clickPp() {
        await this.ppField.click();
    }
}