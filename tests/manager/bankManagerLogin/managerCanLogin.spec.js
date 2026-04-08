import { test, expect } from '@playwright/test';

test('Customer can logout', async ({ page }) => {

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
  
  
  await page.selectOption('#userSelect', { label: 'Harry Potter' });
  await page.getByRole('button', { name: 'Login' }).click();
  
  const logoutButton = page.getByRole('button', { name: 'Logout' });
  await expect(logoutButton).toBeVisible();
  

  await logoutButton.click();

  await expect(page.locator('#userSelect')).toBeVisible();
});