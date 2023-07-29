import { ElementFinder, element, by } from "protractor";

export class OnboardingComponentPage {
    private nickNameField: ElementFinder;
    private emailField: ElementFinder;
    private countryField: ElementFinder;

    constructor() {
        this.nickNameField = element(by.id("profileFormNickname"));
        this.emailField = element(by.id("profileFormEmailAddress"));
        this.countryField = element(by.id("profileFormCountry"));
    }

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
        console.log(this.countryField);
        console.log("vall", value);
    }

    async getCountry() {
        return await this.countryField.getText();
    }
}