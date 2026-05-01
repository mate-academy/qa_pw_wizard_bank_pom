import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
let firstName;
let lastName;
let postCode;
test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('firstName');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('lastName');
  await page.getByPlaceholder('Post Code').click();
  await page.getByPlaceholder('Post Code').fill('zipCode');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
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
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.locator('#currency').selectOption('Dollar');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Process' }).click();
  await page.getByRole('button', { name: 'Customers' }).click();
  await expect(page.locator('tbody')).toContainText('1016');
});
