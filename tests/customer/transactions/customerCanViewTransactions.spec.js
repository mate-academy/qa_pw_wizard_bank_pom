import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.locator('#userSelect').selectOption('Harry Potter');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('Assert customer can view transaction history', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Deposit' }).click();
  await page.getByPlaceholder('amount').fill('1000');
  await page.getByRole('form').getByRole('button', { name: 'Deposit' }).click();
  await page.waitForTimeout(1000); 
  await page.getByRole('button', { name: 'Transactions' }).click();
  const transactionRows = page.locator('tbody tr');
  await expect(transactionRows.first()).toBeVisible(); 
});