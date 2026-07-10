import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Customer account data is correct', () => {
  let customerLoginPage;
  let customerAccountPage;

  test.beforeEach(async ({ page }) => {
    customerLoginPage = new CustomerLoginPage(page);
    customerAccountPage = new CustomerAccountPage(page);
    await customerLoginPage.open();
  });

test('Assert customer has correct bank data', async ({ page }) => {
  // #region Assert customer has correct bank data
  /* 
  Test:
  1. Open Wizard bank link
  2. Select Hermione Granger
  3. Click [Login]
  4. Assert Account Number in Dropdown next to the Hermoine Granger name
  5. Assert Account Number text
  5. Assert Balance text
  6. Assert Currency text
  */
//  #endregion
 await customerLoginPage.customerDropDown.selectOption({ label: 'Hermoine Granger' });
 await customerLoginPage.loginButton.click();

 await expect(customerAccountPage.dropDownAccountId).toHaveValue('number:1001');
 await expect(customerAccountPage.accountNumberText).toBeVisible();
 await expect(customerAccountPage.balanceText).toBeVisible();
 await expect(customerAccountPage.currencyText).toBeVisible();
});
});