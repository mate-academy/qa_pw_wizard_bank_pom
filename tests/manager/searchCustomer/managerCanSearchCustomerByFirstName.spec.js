import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill(firstName);
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByPlaceholder('Post Code').click();
  await page.getByPlaceholder('Post Code').fill(postalCode);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
  await page.getByRole('button', { name: 'Customers' }).click();
  await page.getByPlaceholder('Search Customer').click();
  await page.getByPlaceholder('Search Customer').fill(firstName);
  await expect(page.locator('tbody')).toContainText(firstName);
  await expect(page.locator('tbody tr')).toHaveCount(1);
});
