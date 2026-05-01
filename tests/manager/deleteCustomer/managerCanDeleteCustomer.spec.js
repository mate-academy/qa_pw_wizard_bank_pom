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
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill(firstName);
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByPlaceholder('Post Code').click();
  await page.getByPlaceholder('Post Code').fill(postCode);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
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
    const rowToDelete = page.getByRole('row').filter({ hasText: firstName });
    await rowToDelete.getByRole('button', { name: 'Delete' }).click();

    await expect(page.locator('tbody')).not.toContainText(firstName);
    
    await page.reload();
    
    await expect(page.locator('tbody')).not.toContainText(firstName);
});
