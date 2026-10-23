
import { test, expect } from '@playwright/test';

test('Assert manager can Login', async ({ page }) => {
  await page.goto('/angularJs-protractor/BankingProject/#/login');

  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  await expect(page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Account' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Customers' })).toBeVisible();
});