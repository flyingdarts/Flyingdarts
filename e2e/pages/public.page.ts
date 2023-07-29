import { ElementFinder, by, element } from "protractor";

export class PublicComponentPages {
    private tosField: ElementFinder;
    private ppField: ElementFinder;

    constructor() {
        this.tosField = element(by.id("tos-link"));
        this.ppField = element(by.id("pp-link"));
    }

    async clickTos() {
        await this.tosField.click();
    }

    async clickPp() {
        await this.ppField.click();
    }
}