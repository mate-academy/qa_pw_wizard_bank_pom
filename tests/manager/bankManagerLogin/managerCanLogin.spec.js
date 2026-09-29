import { test } from "@playwright/test";
import { BankHomePage } from "../../../src/pages/BankHomePage";

<<<<<<< HEAD
test("Assert manager can Login", async ({ page }) => {
=======
test('Assert manager can Login', async ({ page }) => {
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
<<<<<<< HEAD
  const bankHome = new BankHomePage(page);

  await bankHome.open();
  await bankHome.clickManagerLoginButton();

  await bankHome.visibleAddButton();
  await bankHome.visibleOpenButton();
  await bankHome.visibleCustomerButton();
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
});
