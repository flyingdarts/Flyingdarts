import { browser, ProtractorExpectedConditions } from "protractor"
import { protractor } from "protractor/built/ptor"

export abstract class BasePage {

    protected ec: ProtractorExpectedConditions = protractor.ExpectedConditions;

    protected abstract getPartialUrl(): string

    private getBaseUrl(): string {
        let baseUrl = "http://localhost:4200"

        if (baseUrl) {
            return String(baseUrl)
        }

        throw new Error('Unable to get base URL property from ')
    }

    public async open(): Promise<void> {
        await browser.waitForAngular();
        // Disable waiting for Angular during navigation
        await browser.waitForAngularEnabled(false);
        // Perform client-side navigation
        await browser.get(this.getBaseUrl() + this.getPartialUrl())
        // Re-enable waiting for Angular
        await browser.waitForAngularEnabled(true);
    }

    public async verify(): Promise<void> {
        await browser.getCurrentUrl().then((currentUrl) => {
            if (!currentUrl.endsWith(this.getPartialUrl())) {
                throw Error('Current URL ' + currentUrl + ' does not end with ' + this.getPartialUrl());
            }
        })
    }

    public async getAlertText(): Promise<string> {
        await browser.wait(this.ec.alertIsPresent());
        return await browser.switchTo().alert().getText()
    }

    public async acceptAlert(): Promise<void> {
        await browser.wait(this.ec.alertIsPresent());
        await browser.switchTo().alert().accept()
        await browser.wait(this.ec.not(this.ec.alertIsPresent()));
    }
}