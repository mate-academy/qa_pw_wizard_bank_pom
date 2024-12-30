import { test, expect } from '@playwright/test';

test('Assert manager can Login', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.click('button[ng-click="manager()"]');

  const addCustomerButton = page.locator('button[ng-click="addCust()"]');
  const openAccountButton = page.locator('button[ng-click="openAccount()"]');
  const customersButton = page.locator('button[ng-click="showCust()"]');

  await expect(addCustomerButton).toBeVisible();
  await expect(openAccountButton).toBeVisible();
  await expect(customersButton).toBeVisible();
});
