const { test, expect } = require('@playwright/test');
const { OpenAccountPage } = require('../../../src/pages/manager/OpenAccountPage.js');

test.describe('Currency selection validation', () => {
  let openAccountPage;

  test.beforeEach(async ({ page }) => {
    openAccountPage = new OpenAccountPage(page);
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
    await expect(page).toHaveURL(/openAccount$/);
  });

  test('Manager can select all available currencies', async ({ page }) => {
    const currencies = [
      { value: 'Dollar', label: 'Dollar' },
      { value: 'Pound', label: 'Pound' },
      { value: 'Rupee', label: 'Rupee' }
    ];

    for (const currency of currencies) {
      await test.step(`Select and verify ${currency.label} currency`, async () => {
        await openAccountPage.selectCurrency(currency.value);
        
        
        const selectedValue = await openAccountPage.currencySelect.inputValue();
        await expect(selectedValue).toBe(currency.value);
        
        
        const selectedText = await page.locator('#currency option:checked').innerText();
        await expect(selectedText).toContain(currency.label);
      });
    }
  });
});