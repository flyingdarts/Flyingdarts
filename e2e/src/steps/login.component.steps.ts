import { Given, When, Then } from '@cucumber/cucumber';
import { LoginComponentPage } from '../pages/login.component.page';
import { browser } from 'protractor';
import { assert, expect } from 'chai'; // Import expect from the chai library or the appropriate Jasmine library.

let loginPage: LoginComponentPage;

Given("the login page is loaded", async () => {
    loginPage = new LoginComponentPage();
    // Disable waiting for Angular during navigation
    await browser.waitForAngularEnabled(false);
    // Perform client-side navigation
    await browser.get("http://localhost:4200");
    // Re-enable waiting for Angular
    await browser.waitForAngularEnabled(true);
});

When("I select the checkbox", async () => {
    await loginPage.clickCheckbox();
});

Then("I can login", async () => {
    var canI: boolean = await loginPage.buttonEnabled();
    assert(canI == true);
});

Then("I cannot login", async () => {
    expect(await loginPage.buttonEnabled()).to.be.false;
});

Given("I click the login with facebook button", async () => {
    await loginPage.clickLoginButton();
})
