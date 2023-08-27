import { Given } from "@cucumber/cucumber";
import { GamePage } from "../pages/game.page";

let gamePage: GamePage;

Given(/^the game page is loaded$/, async () => {
    gamePage = new GamePage();

    await gamePage.open();
    await gamePage.verify();
})