import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();

  await customerLoginPage.waitForOpened();
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.assertLoginButtonIsVisible();
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.assertLogoutButtonIsVisible();
  await customerAccountPage.assertCustomerNameIsVisible('Harry Potter');

  /*
  Test:
  1. Open Wizard bank home page
  2. Click [Customer Login]
  3. Wait for customer login page to open
  4. Assert customer dropdown is visible
  5. Select customer "Harry Potter"
  6. Assert [Login] button is visible
  7. Click [Login]
  8. Assert customer account page is opened with Logout button visible
  9. Assert customer name is displayed
  */
});

