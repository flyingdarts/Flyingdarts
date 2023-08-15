import { element, by, browser, ElementFinder } from 'protractor';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly partialUrl: string = "/login"

    protected override getPartialUrl(): string {
        return this.partialUrl;
    }

    private checkBox: ElementFinder = element(by.id("flexCheckChecked"));
    private loginButton: ElementFinder = element(by.id("loginButton"));
    private authenticator: ElementFinder = element(by.id("amplifyLogin"));

    authenticatorLoaded(): boolean {
        return this.authenticator != null;
    }

    async clickCheckbox() {
        await this.checkBox.click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
    
    async buttonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

}