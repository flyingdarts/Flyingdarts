import { After } from "@cucumber/cucumber";
import { browser } from "protractor";
import fs from 'fs';
import path from 'path';

After(async (scenario) => {
    // Access the scenario name
    var screenshotName = scenario.pickle.name;

    // Modify scenaria name
    screenshotName = screenshotName.replace(/[\/ ]/g, '_').toLowerCase();

    // Take a screenshot
    const screenshot = await browser.takeScreenshot();

    // Define path
    const screenshotPath = path.join(__dirname, '../../screenshots', `${screenshotName}.png`);

    fs.writeFileSync(screenshotPath, screenshot, 'base64');
})


function wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}