import { Given, Then, When } from '@cucumber/cucumber';
import { LobbyPage } from '../pages/lobby.page';
import { AccountSettingsPage } from '../pages/account.settings.page';
import { expect } from 'chai';
import { browser } from 'protractor';
import { AccountProfilePage } from '../pages/account.profile.page';

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
    var accountProfilePage = new AccountProfilePage();
    await accountProfilePage.open();
})

When("I click on the settings button", async () => {
    var accountSettingsPage = new AccountSettingsPage();
    await accountSettingsPage.open();
})

Then("the account/profile page is loaded", async () => {
    await browser.waitForAngularEnabled(false);
    var currentUrl = await browser.getCurrentUrl();
    await browser.waitForAngularEnabled(true);
    expect(currentUrl).to.contain("profile");
})

Then("the account/settings page is loaded", async () => {
    await browser.waitForAngularEnabled(false);
    var currentUrl = await browser.getCurrentUrl();
    await browser.waitForAngularEnabled(true);
    expect(currentUrl).to.contain("settings");
})
