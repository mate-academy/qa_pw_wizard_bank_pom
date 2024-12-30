import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
  await page.fill('input[placeholder="First Name"]', firstName);
  await page.fill('input[placeholder="Last Name"]', lastName);
  await page.fill('input[placeholder="Post Code"]', postalCode);
  await page.click('button[type="submit"]');

  await page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  await page.click('button[ng-click="openAccount()"]');

  await page.selectOption('select[ng-model="custId"]', { label: `${firstName} ${lastName}` });
  await page.selectOption('select[ng-model="currency"]', 'Dollar');
  await page.click('button[type="submit"]');

  await page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.reload();
  await page.click('button[ng-click="showCust()"]');

  const lastRow = page.locator('table tbody tr').last();
  await expect(lastRow.locator('td:nth-child(1)')).toHaveText(firstName);
  await expect(lastRow.locator('td:nth-child(2)')).toHaveText(lastName);
  await expect(lastRow.locator('td:nth-child(4)')).not.toBeEmpty();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  await page.click('button[ng-click="showCust()"]');

  await page.fill('input[ng-model="searchCustomer"]', firstName);

  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);

  const firstRow = rows.first();
  await expect(firstRow.locator('td:nth-child(1)')).toHaveText(firstName);
  await expect(firstRow.locator('td:nth-child(2)')).toHaveText(lastName);
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  await page.click('button[ng-click="showCust()"]');

  await page.fill('input[ng-model="searchCustomer"]', lastName);

  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);

  const firstRow = rows.first();
  await expect(firstRow.locator('td:nth-child(1)')).toHaveText(firstName);
  await expect(firstRow.locator('td:nth-child(2)')).toHaveText(lastName);
});
