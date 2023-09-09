import { ElementFinder, browser, by, element } from "protractor";
import { BasePage } from "./base.page";
import { expect } from 'chai';

export class GamePage extends BasePage {
    readonly partialUrl = "/x01/638286987074415329";

    protected override getPartialUrl(): string {
        return this.partialUrl;
    }

    inputField: ElementFinder = element(by.id("calcInputField"));

    // Player fields
    playerNameField: ElementFinder = element(by.id("playerNameField"));
    playerSetsField: ElementFinder = element(by.id("playerSetsField"));
    playerLegsField: ElementFinder = element(by.id("playerLegsField"));
    playerScoreField: ElementFinder = element(by.id("playerScoreField"));
    playerHistoryField: ElementFinder = element(by.id("playerHistoryField"));

    // Opponent fields
    opponentNameField: ElementFinder = element(by.id("opponentNameField"));
    opponentSetsField: ElementFinder = element(by.id("opponentSetsField"));
    opponentLegsField: ElementFinder = element(by.id("opponentLegsField"));
    opponentScoreField: ElementFinder = element(by.id("opponentScoreField"));
    opponentHistoryField: ElementFinder = element(by.id("opponentHistoryField"));

    // Calculator buttons
    calcButton_1: ElementFinder = element(by.id("calcButton1"));
    calcButton_26: ElementFinder = element(by.id("calcButton26"));
    calcButton_2: ElementFinder = element(by.id("calcButton2"));
    calcButton_3: ElementFinder = element(by.id("calcButton3"));
    calcButton_41: ElementFinder = element(by.id("calcButton41"));
    calcButton_45: ElementFinder = element(by.id("calcButton45"));
    calcButton_4: ElementFinder = element(by.id("calcButton4"));
    calcButton_5: ElementFinder = element(by.id("calcButton5"));
    calcButton_6: ElementFinder = element(by.id("calcButton6"));
    calcButton_60: ElementFinder = element(by.id("calcButton60"));
    calcButton_85: ElementFinder = element(by.id("calcButton85"));
    calcButton_7: ElementFinder = element(by.id("calcButton7"));
    calcButton_8: ElementFinder = element(by.id("calcButton8"));
    calcButton_9: ElementFinder = element(by.id("calcButton9"));
    calcButton_100: ElementFinder = element(by.id("calcButton100"));
    calcButton_NOSCORE: ElementFinder = element(by.id("calcButtonNOSCORE"));
    calcButton_0: ElementFinder = element(by.id("calcButton0"));
    calcButton_OK: ElementFinder = element(by.id("calcButtonOK"));

    async validateInputField(input: string) {
        var result = await this.inputField.getText();
        expect(result).to.be.equal(input);
    }

    // Player fields
    async validatePlayerNameField(input: string) {
        var result = await this.playerNameField.getText();
        expect(result).to.be.equal(input);
    }
    async validatePlayerSetsField(input: string) {
        var result = await this.playerSetsField.getText();
        expect(result).to.be.equal(input);
    }
    async validatePlayerLegsField(input: string) {
        var result = await this.playerLegsField.getText();
        expect(result).to.be.equal(input);
    }
    async validatePlayerScoreField(input: string) {
        var result = await this.playerScoreField.getText();
        expect(result).to.be.equal(input);
    }
    async validatePlayerHistoryField(input: string) {
        var result = await this.playerHistoryField.getText();
        expect(result).to.be.equal(input);
    }

    // Opponent fields
    async validateOpponentNameField(input: string) {
        var result = await this.opponentNameField.getText();
        expect(result).to.be.equal(input);
    }
    async validateOpponentSetsField(input: string) {
        var result = await this.opponentSetsField.getText();
        expect(result).to.be.equal(input);
    }
    async validateOpponentLegsField(input: string) {
        var result = await this.opponentLegsField.getText();
        expect(result).to.be.equal(input);
    }
    async validateOpponentScoreField(input: string) {
        var result = await this.opponentScoreField.getText();
        expect(result).to.be.equal(input);
    }
    async validateOpponentHistoryField(input: string) {
        var result = await this.opponentHistoryField.getText();
        expect(result).to.be.equal(input);
    }

    // Calculator buttons
    async clickCalcButton_26() {
        return await this.calcButton_26.click();
    }
    async clickCalcButton_1() {
        return await this.calcButton_1.click();
    }
    async clickCalcButton_2() {
        return await this.calcButton_2.click();
    }
    async clickCalcButton_3() {
        return await this.calcButton_3.click();
    }
    async clickCalcButton_41() {
        return await this.calcButton_41.click();
    }
    async clickCalcButton_45() {
        return await this.calcButton_45.click();
    }
    async clickCalcButton_4() {
        return await this.calcButton_4.click();
    }
    async clickCalcButton_5() {
        return await this.calcButton_5.click();
    }
    async clickCalcButton_6() {
        return await this.calcButton_6.click();
    }
    async clickCalcButton_60() {
        return await this.calcButton_60.click();
    }
    async clickCalcButton_85() {
        return await this.calcButton_85.click();
    }
    async clickCalcButton_7() {
        return await this.calcButton_7.click();
    }
    async clickCalcButton_8() {
        return await this.calcButton_8.click();
    }
    async clickCalcButton_9() {
        return await this.calcButton_9.click();
    }
    async clickCalcButton_100() {
        return await this.calcButton_100.click();
    }
    async clickCalcButton_NOSCORE() {
        return await this.calcButton_NOSCORE.click();
    }
    async clickCalcButton_0() {
        return await this.calcButton_0.click();
    }
    async clickCalcButton_OK() {
        return await this.calcButton_OK.click();
    }
}
