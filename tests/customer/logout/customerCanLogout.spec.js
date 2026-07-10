import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Logout', () => {
  let bankHomePage;
  let customerLoginPage;
  let customerAccountPage;

test.beforeEach(async ({ page }) => {
  bankHomePage = new BankHomePage(page);
  customerLoginPage = new CustomerLoginPage(page);
  customerAccountPage = new CustomerAccountPage(page);
  await page.goto('angularJs-protractor/BankingProject');
});

test('Assert correct customer Logout', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank link
  2. Click [Customer Login]
  3. Select Neville Longbottom
  4. Click [Login]
  5. Click [Logout]
  6. Wait for the page URL 
  https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer
  7. Assert the drop-down is present with empty value 
  */
 await bankHomePage.customerLoginButton.click();
 await customerLoginPage.customerDropDown.selectOption({ label: 'Neville Longbottom'});
 await customerLoginPage.loginButton.click();

 await customerAccountPage.logoutButton.click();
 await page.waitForURL('angularJs-protractor/BankingProject/#/customer');
 await expect(customerLoginPage.customerDropDown).toHaveValue('');
});
});