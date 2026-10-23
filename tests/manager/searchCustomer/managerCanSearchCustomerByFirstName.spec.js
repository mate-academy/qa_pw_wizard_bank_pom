
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');

  await page.locator('input[ng-model="fName"]').fill(firstName);
  await page.locator('input[ng-model="lName"]').fill(lastName);
  await page.locator('input[ng-model="postCd"]').fill(postalCode);

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  await page.goto('/angularJs-protractor/BankingProject/#/manager/list');

  const searchInput = page.locator('input[placeholder="Search Customer"]');
  await searchInput.fill(firstName);

  const rows = page.locator('table tbody tr');

  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText(firstName);
  await expect(rows.first()).toContainText(lastName);
  await expect(rows.first()).toContainText(postalCode);
});