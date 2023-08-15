import { After, AfterStep, Before } from "@cucumber/cucumber";
import * as PropertiesReader from "properties-reader";
import { browser } from "protractor";
import * as fs from 'fs';


Before(async () => {
    // Disable waiting for Angular during navigation
    await browser.waitForAngularEnabled(false);
    // Perform client-side navigation
    await browser.get("http://localhost:4200");
    // Re-enable waiting for Angular
    await browser.waitForAngularEnabled(true);
})

Before({ tags: "@requires-logged-in-user", timeout: 10 * 1000 }, async () => {
    const projectPropsPath: string = 'e2e/local.properties'

    const pool = String(PropertiesReader(projectPropsPath).get('pool'));
    const user = String(PropertiesReader(projectPropsPath).get("lastAuthUser"));
    const signin = String(PropertiesReader(projectPropsPath).get("amplify-signin-with-hostedUI"))
    const redirect = String(PropertiesReader(projectPropsPath).get("amplify-redirected-from-hosted-ui"))
    const accessToken = String(PropertiesReader(projectPropsPath).get("accessToken"))
    const idToken = String(PropertiesReader(projectPropsPath).get("idToken"))
    const clockDrift = String(PropertiesReader(projectPropsPath).get("clockDrift"))
    const refreshToken = String(PropertiesReader(projectPropsPath).get("refreshToken"))
    const jsonString = String(PropertiesReader(projectPropsPath).get("userData"));
    const userData = JSON.parse(JSON.parse(jsonString))

    browser.executeScript(`localStorage.setItem("amplify-signin-with-hostedUI", "${signin}");`)
    browser.executeScript(`localStorage.setItem("amplify-redirected-from-hosted-ui", "${redirect}");`)
    browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.LastAuthUser","${user}");`)
    browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.accessToken","${accessToken}");`)
    browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.idToken","${idToken}");`)
    browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.clockDrift","${clockDrift}");`)
    browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.refreshToken","${refreshToken}");`)
    browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.userData",${JSON.stringify(userData)});`)
})

After({ tags: "@requires-logged-in-user" }, async () => {
    var imageData: string = await browser.takeScreenshot();
    await writeStringToFile('imageData.txt', imageData);
    browser.executeScript('localStorage.clear();');
})

async function writeStringToFile(filePath: string, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}