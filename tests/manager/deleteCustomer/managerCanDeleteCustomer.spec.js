import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust'
  );

  await page.getByPlaceholder('First Name').fill('Mona');
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByPlaceholder('Post Code').fill(postCode);

  await page.locator('[type="submit"]').click();

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
  await page.getByRole('button', { name: 'Customers' }).click();

  const lastRow = page.locator('table tbody tr').last();
  await lastRow.locator('button', { hasText: 'Delete' }).click();
  await expect(page.getByText('Mona')).not.toBeVisible();
  await page.reload();
  await expect(lastRow.locator('Mona')).not.toBeVisible();
});
