import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
  async pageLoaded() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager');
  }
  async farifyButtonsVisible() {
    await expect(this.page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Open Account' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Customers' })).toBeVisible();
  }
}
