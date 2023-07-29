import { Given, When, Then } from '@cucumber/cucumber';
import { browser } from 'protractor';
import { assert, expect } from 'chai'; // Import expect from the chai library or the appropriate Jasmine library.
import { OnboardingComponentPage } from '../pages/onboarding.component.page';

let onboardingPage: OnboardingComponentPage;

Given("the onboarding profile page is loaded", async () => {
    onboardingPage = new OnboardingComponentPage();
    // Disable waiting for Angular during navigation
    await browser.waitForAngularEnabled(false);
    // Perform client-side navigation
    await browser.get("http://localhost:4200/onboarding/(onboarding-outlet:profile)");
    // Re-enable waiting for Angular
    await browser.waitForAngularEnabled(true);
})

Given(/^I can fill in (.*) as my Nickname$/, async (name: string) => {
    await onboardingPage.inputNickname(name);

    expect(await onboardingPage.getNickname()).to.be.equal(name);
})

Given(/^I can fill in (.*) as my Email$/, async (email: string) => {
    await onboardingPage.inputEmail(email);

    expect(await onboardingPage.getEmail()).to.be.equal(email);
})

Given(/^I can select (.*) as my Country$/, async (country: string) => {
    await onboardingPage.inputCountry(country);

    expect(await onboardingPage.getCountry()).to.be.equal(country);
})

Given("The AWS Oauth window opens", { timeout: 60 * 1000 }, async () => {
    await browser.waitForAngularEnabled(false);
    var currentUrl = await browser.getCurrentUrl();
    await browser.waitForAngularEnabled(true);
    expect(currentUrl).to.be.contains("amazoncognito.com")
})