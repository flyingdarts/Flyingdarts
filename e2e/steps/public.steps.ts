import { Given, Then, When } from "@cucumber/cucumber";
import { PublicComponentPages } from "./../pages/public.page";
import { browser } from "protractor";
import { assert, expect } from 'chai'; // Import expect from the chai library or the appropriate Jasmine library.

let publicPage: PublicComponentPages = new PublicComponentPages();

When("I click on Privacy Policy", async () => {
    await publicPage.clickPp();
})

When("I click on Terms of Service", async () => {
    await publicPage.clickTos();
})

Given("The Privacy Policy page is opened", async () => {
    var route = await browser.getCurrentUrl();
    expect(route).to.be.equal('http://localhost:4200/privacy-policy');
})

Given("The Terms of Service page is opened", async () => {
    var route = await browser.getCurrentUrl();
    expect(route).to.be.equal('http://localhost:4200/terms-of-service');
})