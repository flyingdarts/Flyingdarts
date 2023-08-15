import { browser } from "protractor"

export abstract class BasePage {
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
}