import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.page.selectOption('#currency', {label: currency});
  }

  async assertCurrency(currency) {
    await expect(this.page.locator('#currency')).toHaveValue(currency);
  }

  async selectCustomer(firstName, lastName) {
    await this.page.selectOption('#userSelect', {label: firstName + ' ' + lastName});
  }

  async clickProcessButton() {
    await this.page.getByRole('button', { name: 'Process' }).click();
  }

  async reloadPage() {
    await this.page.reload();
  }
}
