import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert correct customer Logout', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank link */

  const bankHomePage = new BankHomePage(page);
  await bankHomePage.open();

  // 2. Click [Customer Login]

  await bankHomePage.clickCustomerLoginButton();

  // 3. Select Neville Longbottom

  const customerLoginPage = new CustomerLoginPage(page);
  await customerLoginPage.selectCustomer('Neville Longbottom');

  // 4. Click [Login]

  await customerLoginPage.clickLoginButton();

  // 5. Click [Logout]

  const accountPage = new CustomerAccountPage(page);
  await accountPage.clickLogoutButton();

  // 6. Wait for the page URL 
  // https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer

  await customerLoginPage.waitForOpened();
  
    // 7. Assert the drop-down is present with empty value 

  await customerLoginPage.assertSelectCustomerDropdownIsVisible();
  await customerLoginPage.assertSelectCustomerDropdownContainsValue('');

  // */
});
