import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, context }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // Сохраняем данные в контексте теста
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

test('Assert manager can add new customer', async ({ page, context }) => {
  const firstName = context.firstName;
  const lastName = context.lastName;

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
