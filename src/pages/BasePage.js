import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a relative path (resolves with baseURL from playwright.config.js)
   * @param {string} path - e.g., '/', '/angularJs-protractor/BankingProject/'
   */
  async open(path = '/') {
    await this.page.goto(path);
  }

  /**
   * Click an element safely with waiting.
   */
  async click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Fill an input safely with waiting.
   */
  async fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /**
   * Get trimmed inner text of a locator.
   */
  async getText(locator) {
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }

  /**
   * Wait for a dialog and accept it.
   * Returns dialog message text for assertions.
   */
  async handleDialog(action = 'accept') {
    const dialog = await this.page.waitForEvent('dialog');
    const message = dialog.message();
    if (action === 'accept') await dialog.accept();
    else await dialog.dismiss();
    return message;
  }

  /**
   * Assert element is visible.
   */
  async assertVisible(locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Wait for navigation or network idle to ensure page stability.
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
