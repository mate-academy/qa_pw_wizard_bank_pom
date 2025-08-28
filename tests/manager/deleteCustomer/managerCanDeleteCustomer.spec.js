import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postCode;

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
  lastName  = faker.person.lastName();
  postCode  = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');

  await page.getByPlaceholder('First Name').fill(firstName);
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByPlaceholder('Post Code').fill(postCode);

  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();

  await page.reload();
});

test('Assert manager can delete customer', async ({ page }) => {
  /*
    Test:
    1. Open Customers page.
    2. Click [Delete] for the row with customer name.
    3. Assert customer row is not present in the table.
    4. Reload the page.
    5. Assert customer row is not present in the table.
  */
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  const search = page.getByPlaceholder('Search Customer');
  await search.fill(postCode);

  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);

  const targetRow = rows.filter({ hasText: firstName }).filter({ hasText: lastName });
  await expect(targetRow).toHaveCount(1);

  await targetRow.getByRole('button', { name: 'Delete' }).click();

  await expect(targetRow).toHaveCount(0);

  await page.reload();
  await search.fill(postCode);
  await expect(page.locator('table tbody tr')).toHaveCount(0);
});
