import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can select account and check balance', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank customer login
  2. Select "Hermoine Granger"
  3. Click [Login]
  4. Assert account 1001 balance and currency
  5. Select account 1002
  6. Assert account 1002 is selected and currency is Pound
  7. Select account 1003
  8. Assert account 1003 is selected and currency is Rupee
  */
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  await accountPage.assertAccountNumber('1001');
  await accountPage.assertCurrency('Dollar');

  await accountPage.selectAccount('1002');
  await accountPage.assertAccountNumber('1002');
  await accountPage.assertCurrency('Pound');

  await accountPage.selectAccount('1003');
  await accountPage.assertAccountNumber('1003');
  await accountPage.assertCurrency('Rupee');
});

