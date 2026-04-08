import { test, expect } from '@playwright/test';

test('Customer can deposit and see transaction', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
  await page.selectOption('#userSelect', { label: 'Harry Potter' });
  await page.click('button:has-text("Login")');

 
  await page.click('button[ng-click="deposit()"]');
  await page.fill('input[ng-model="amount"]', '100');
  await page.click('form button:has-text("Deposit")');

  const successMessage = page.locator('span.error');
  await expect(successMessage).toHaveText('Deposit Successful');
  await page.waitForTimeout(1000); 

  await page.click('button[ng-click="transactions()"]'); 
  
  const transactionRow = page.locator('table tbody tr').filter({ hasText: '100' });
  
  await expect(transactionRow.first()).toBeVisible({ timeout: 20000 });
});