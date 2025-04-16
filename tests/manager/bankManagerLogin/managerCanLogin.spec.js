const { test, expect } = require('@playwright/test');
const { BankHomePage } = require('../../../src/pages/BankHomePage.js');
const { BankManagerMainPage } = require('../../../src/pages/manager/BankManagerMainPage.js');

test('Manager login test', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerPage = new BankManagerMainPage(page);

  await test.step('1. Open homepage', async () => {
    await bankHomePage.open();
    await expect(page).toHaveTitle('XYZ Bank');
  });

  await test.step('2. Login as manager', async () => {
    await bankHomePage.navigateToManagerLogin();
    await expect(page).toHaveURL(/manager$/);
  });

  await test.step('3. Verify manager dashboard', async () => {
    await bankManagerPage.verifyManagerPageLoaded();
  });
});
/* 
Test:
1. Open Wizard bank home page (https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)
2. Click [Bank Manager Login]
3. Assert button [Add Customer] is visible
4. Assert button [Open Account] is visible
5. Assert button [Customers] is visible
*/
