import { ElementFinder, element, by } from "protractor";
import { BasePage } from "./base.page";

export class OnboardingPage extends BasePage {
    readonly partialUrl: string = "/onboarding/(onboarding-outlet:profile)"

    protected override getPartialUrl(): string {
        return this.partialUrl
    }

    private nickNameField: ElementFinder = element(by.id("profileFormNickname"));
    private emailField: ElementFinder = element(by.id("profileFormEmailAddress"));
    private countryField: ElementFinder = element(by.id("profileFormCountry"));


    async inputNickname(value: string) {
        await this.nickNameField.sendKeys(value);
    }

    async getNickname() {
        return await this.nickNameField.getText();
    }

    async inputEmail(value: string) {
        await this.emailField.sendKeys(value);
    }

    async getEmail() {
        return await this.emailField.getText();
    }

    async inputCountry(value: string) {
        element(by.cssContainingText('option', value)).click();
    }

    async getCountry() {
        return await this.countryField.getText();
    }
}