import { test } from "@playwright/test";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";

<<<<<<< HEAD
test("Assert manager can choose currencies for account", async ({ page }) => {
=======
test('Assert manager can choose currencies for account', async ({ page }) => {
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
<<<<<<< HEAD

  const openAccount = new OpenAccountPage(page);

  await openAccount.open();
  await openAccount.chooseCurrentCurrency("Dollar");
  await openAccount.whatIsCurrentCurrency("Dollar");

  await openAccount.chooseCurrentCurrency("Pound");
  await openAccount.whatIsCurrentCurrency("Pound");

  await openAccount.chooseCurrentCurrency("Rupee");
  await openAccount.whatIsCurrentCurrency("Rupee");
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
});
