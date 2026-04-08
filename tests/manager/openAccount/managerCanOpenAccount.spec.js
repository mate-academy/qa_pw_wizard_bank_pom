import { test, expect } from '@playwright/test';
test('Manager can open account', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/');;

  await page.click('button[ng-click="manager()"]');
  await page.click('button[ng-click="openAccount()"]');

  await page.selectOption('#userSelect', { index: 1 });
  await page.selectOption('#currency', 'Dollar');

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Account created successfully');
    await dialog.accept();
  });

  await page.click('button[type="submit"]');
});