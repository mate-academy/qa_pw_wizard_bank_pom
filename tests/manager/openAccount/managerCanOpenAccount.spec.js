import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

  // 1. Open Add Customer page
  await page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust'
  );

  // 2–4. Fill customer data
  await page.locator('input[ng-model="fName"]').fill('Sam');
  await page.locator('input[ng-model="lName"]').fill('Som');
  await page.locator('input[ng-model="postCd"]').fill('1234567');

  // 5. Click Add Customer
  await page.locator('[type="submit"]').click();

  // 6. Reload page to close alert
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {

  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */

      // 1. Click [Open Account]
  await page.getByRole('button', { name: 'Open Account' }).click();

  // 2. Select newly created customer
  await page.locator('#userSelect').selectOption({
    label: `${'Sam'} ${'Som'}`,
  });

  // 3. Select currency
  await page.locator('#currency').selectOption('Dollar');

  // 4. Click [Process]
  await page.getByRole('button', { name: 'Process' }).click();

  // 5. Reload page to close alert
  await page.reload();

  // 6. Click [Customers]
  await page.getByRole('button', { name: 'Customers' }).click();

  // 7. Assert account number is not empty in the last row
  const lastRow = page.locator('table tbody tr').last();
  const accountNumberCell = lastRow.locator('td').nth(3);

  await expect(accountNumberCell).not.toHaveText('');

});
