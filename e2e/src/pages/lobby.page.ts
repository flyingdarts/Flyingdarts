import { ElementFinder, element, by, browser } from "protractor";
import { BasePage } from "./base.page";

export class LobbyPage extends BasePage {
    readonly partialUrl: string = "/lobby"

    protected override getPartialUrl(): string {
        return this.partialUrl
    }

    private userNameField: ElementFinder = element(by.id("loggedInUserName"));
    private profileButtonField: ElementFinder = element(by.id("profileButton"));
    private settingsButtonField: ElementFinder = element(by.id("settingsButton"));

    async getNickname() {
        return await this.userNameField.getText();
    }

    async clickProfileButton() {
        return await this.profileButtonField.click();
    }

    async clickSettingsButton() {
        return await this.settingsButtonField.click();
    }

    async getCurrentUrl() {
        return await browser.getCurrentUrl();
    }
}