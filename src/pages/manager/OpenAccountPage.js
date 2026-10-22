import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async selectCustomer(fullName) {
    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  // Plain click (Playwright auto-dismisses the alert if nobody listens)
  async clickProcessButton() {
    await this.processButton.click();
  }

  // Click Process and capture the alert text.
  // The click must NOT be awaited before the dialog is handled,
  // because alert() blocks the click from completing.
  async submitAndGetAlertMessage() {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = this.processButton.click();

    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();

    await clickPromise;
    return message;
  }

  async assertFormIsVisible() {
    await expect(this.customerSelect).toBeVisible();
    await expect(this.currencySelect).toBeVisible();
    await expect(this.processButton).toBeVisible();
  }

  async assertCustomerOptionExists(fullName) {
    await expect(
      this.customerSelect.locator('option', { hasText: fullName })
    ).toHaveCount(1);
  }

  async assertCustomerOptionDoesNotExist(fullName) {
    await expect(
      this.customerSelect.locator('option', { hasText: fullName })
    ).toHaveCount(0);
  }

  async assertCurrencyOptions(expectedCurrencies) {
    const options = this.currencySelect.locator('option:not([value=""])');
    await expect(options).toHaveText(expectedCurrencies);
  }

  async assertAlertMessage(actualMessage, expected) {
    if (expected instanceof RegExp) {
      expect(actualMessage).toMatch(expected);
    } else {
      expect(actualMessage).toContain(expected);
    }
  }

  async assertCurrencyIsSelected(currency) {
    await expect(this.currencySelect.locator('option:checked')).toHaveText(currency);
  }

  // "Account created successfully with account Number :1016" -> "1016"
  getAccountNumberFromMessage(message) {
    const match = message.match(/Number\s*:\s*(\d+)/);
    expect(match, `No account number in: ${message}`).not.toBeNull();
    return match[1];
  }
}
