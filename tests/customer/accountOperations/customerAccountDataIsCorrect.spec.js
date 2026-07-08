import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer has correct bank data', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank link */

  const loginPage = new CustomerLoginPage(page);
  await loginPage.open();

  // 2. Select Hermione Granger

  await loginPage.selectCustomer('Hermoine Granger');

  // 3. Click [Login]

    await loginPage.clickLoginButton();

  // 4. Assert Account Number in Dropdown next to the Hermoine Granger name

  const accountPage = new CustomerAccountPage(page);
  await accountPage.assertAccountIdInDropDownHasValue('number:1001');

  // 5. Assert Account Number text

  await accountPage.assertAccountLineContainsText('Account Number : 1001');

  // 6. Assert Balance text

  await accountPage.assertAccountLineContainsText('Balance : 5096');

  // 7. Assert Currency text

  await accountPage.assertAccountLineContainsText('Currency : Dollar');

  // */
// 
});
