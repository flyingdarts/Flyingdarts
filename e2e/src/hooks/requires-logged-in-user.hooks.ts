import { After, Before } from "@wdio/cucumber-framework";
import { browser } from "@wdio/globals";
import PropertiesReader from "properties-reader";

Before({ tags: "@requires-logged-in-user", timeout: 10 * 1000 }, async () => {
    await browser.setTimeout({implicit: 5000, pageLoad: 10000});
    await browser.setWindowSize(1920, 1080);
    await browser.url("http://localhost:4200");

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

    await browser.executeScript(`localStorage.setItem("amplify-signin-with-hostedUI", "${signin}");`, [])
    await browser.executeScript(`localStorage.setItem("amplify-redirected-from-hosted-ui", "${redirect}");`, [])
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.LastAuthUser","${user}");`, [])
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.accessToken","${accessToken}");`, [])
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.idToken","${idToken}");`, [])
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.clockDrift","${clockDrift}");`, [])
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.refreshToken","${refreshToken}");`, [])
    await browser.executeScript(`localStorage.setItem("CognitoIdentityServiceProvider.${pool}.${user}.userData",${JSON.stringify(userData)});`, [])
})

After({ tags: "@requires-logged-in-user" }, async () => {
    await browser.executeScript('localStorage.clear();', []);
})