import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, context }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  context.firstName = firstName;
  context.lastName = lastName;

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
  await page.fill('input[placeholder="First Name"]', firstName);
  await page.fill('input[placeholder="Last Name"]', lastName);
  await page.fill('input[placeholder="Post Code"]', postCode);
  await page.click('button[type="submit"]');

  await page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.reload();
});

test('Assert manager can delete customer', async ({ page, context }) => {
  const firstName = context.firstName;
  const lastName = context.lastName;

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  const customerRow = page.locator('table tbody tr').filter({ hasText: firstName });
  await customerRow.locator('button').nth(0).click();

  await expect(customerRow).not.toBeVisible();

  await page.reload();

  const reloadedRow = page.locator('table tbody tr').filter({ hasText: firstName });
  await expect(reloadedRow).not.toBeVisible();
});
