import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Customer Login' }).click();
  

  await page.locator('#userSelect').selectOption('Harry Potter');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('Assert customer can deposit money', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Deposit' }).click();
  await page.getByPlaceholder('amount').fill('500');
  await page.getByRole('form').getByRole('button', { name: 'Deposit' }).click();
  const successMessage = page.locator('.error.ng-binding');
  await expect(successMessage).toHaveText('Deposit Successful');
});