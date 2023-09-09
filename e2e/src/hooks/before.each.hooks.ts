import { Before } from "@cucumber/cucumber";
import { browser } from "protractor";


Before(async () => {
    // Set browser size
    await browser.manage().timeouts().implicitlyWait(5000);

    await browser.manage().timeouts().pageLoadTimeout(2000);

    await browser.manage().window().setSize(1920, 1080)
    // Disable waiting for Angular during navigation
    await browser.waitForAngularEnabled(false);
    // Perform client-side navigation
    await browser.get("http://localhost:4200");
    // Re-enable waiting for Angular
    await browser.waitForAngularEnabled(true);
})
