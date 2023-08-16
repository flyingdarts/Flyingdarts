import { Before } from "@cucumber/cucumber";
import { browser } from "protractor";


Before(async () => {
    // Disable waiting for Angular during navigation
    await browser.waitForAngularEnabled(false);
    // Perform client-side navigation
    await browser.get("http://localhost:4200");
    // Re-enable waiting for Angular
    await browser.waitForAngularEnabled(true);
})