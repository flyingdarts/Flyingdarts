import { After, Before } from "@cucumber/cucumber";
import { browser } from "protractor";
import PropertiesReader from "properties-reader";

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

    await browser.executeScript(`localStorage.setItem("amplify-signin-with-hostedUI", "${signin}");`)
    await browser.executeScript(`localStorage.setItem("amplify-redirected-from-hosted-ui", "${redirect}");`)
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.LastAuthUser","${user}");`)
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.accessToken","${accessToken}");`)
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.idToken","${idToken}");`)
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.clockDrift","${clockDrift}");`)
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.refreshToken","${refreshToken}");`)
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.userData",${JSON.stringify(userData)});`)

    await wait(2 * 1000);
})

After({ tags: "@requires-logged-in-user" }, async () => {
    await browser.executeScript('localStorage.clear();');
})

function wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}