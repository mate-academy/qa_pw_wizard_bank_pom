import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can switch between accounts', { tag: '@customer' }, async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();
  await accountPage.assertAccountLineContainsText('Account Number : 1004');
  await accountPage.assertAccountLineContainsText('Currency : Dollar');
  await accountPage.selectAccount('1005');
  await accountPage.assertAccountIdInDropDownHasValue('number:1005');
  await accountPage.assertAccountLineContainsText('Account Number : 1005');
  await accountPage.assertAccountLineContainsText('Balance : 0');
  await accountPage.assertAccountLineContainsText('Currency : Pound');
});