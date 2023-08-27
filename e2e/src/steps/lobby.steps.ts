import { Given, Then, When } from '@cucumber/cucumber';
import { LobbyPage } from '../pages/lobby.page';
import { expect } from 'chai';
import { browser } from 'protractor';

const stepTimeout = 5000;

let lobbyPage: LobbyPage;

Given(/^the lobby page is loaded$/, async () => {
    lobbyPage = new LobbyPage();

    await lobbyPage.open();
    await lobbyPage.verify();
})

Given(/^I can see (.*) in the nav-bar$/, async (userName: string) => {
    expect(await lobbyPage.getNickname()).to.be.equal(userName);
})

When("I click on the profile button", async () => {
    await lobbyPage.clickProfileButton();
})

When("I click on the settings button", async () => {
    await lobbyPage.clickSettingsButton();
})

When("I click on the play with friends button", async () => {
    await lobbyPage.clickGameWithFriends();
})

Then("the account/profile page is loaded", { timeout: 30000 }, async () => {
    await wait(stepTimeout);

    await browser.waitForAngularEnabled(false);
    var currentUrl = await browser.getCurrentUrl();
    await browser.waitForAngularEnabled(false);

    expect(currentUrl).to.contain("profile");
})

Then("the account/settings page is loaded", { timeout: 30000 }, async () => {
    await browser.waitForAngularEnabled(false);
    var currentUrl = await browser.getCurrentUrl();
    await browser.waitForAngularEnabled(false);

    expect(currentUrl).to.contain("settings");
})

// Then("the game page is loaded", { timeout: 30000 }, async () => {
//     await wait(stepTimeout);

//     await browser.waitForAngularEnabled(false);
//     var currentUrl = await browser.getCurrentUrl();
//     await browser.waitForAngularEnabled(false);

//     expect(currentUrl).to.contain("x01");
// })


function wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}