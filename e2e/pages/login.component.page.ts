import { element, by, browser, ElementFinder } from 'protractor';

export class LoginComponentPage {
    private checkBox: ElementFinder;
    private loginButton: ElementFinder;
    private authenticator: ElementFinder;

    constructor() {
        this.checkBox = element(by.id("flexCheckChecked"));
        this.loginButton = element(by.id("loginButton"))
        this.authenticator = element(by.id("amplifyLogin"));
    }

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