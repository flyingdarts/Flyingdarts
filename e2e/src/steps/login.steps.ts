import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login.page';
import { browser } from 'protractor';
import { expect } from 'chai';

let loginPage: LoginPage;

Given("the login page is loaded", async () => {
    loginPage = new LoginPage();
    
    await loginPage.open();
    await loginPage.verify();
});

When("I select the checkbox", async () => {
    await loginPage.clickCheckbox();
});

Then("I can login", async () => {
    expect(await loginPage.buttonEnabled()).to.be.true;
});

Then("I cannot login", async () => {
    expect(await loginPage.buttonEnabled()).to.be.false;
});

Given("I click the login with facebook button", async () => {
    await loginPage.clickLoginButton();
})

Given("The AWS Oauth window opens", async () => {
    await browser.waitForAngularEnabled(false);
    var currentUrl = await browser.getCurrentUrl();
    await browser.waitForAngularEnabled(true);
    expect(currentUrl).to.contain("amazoncognito.com")
})