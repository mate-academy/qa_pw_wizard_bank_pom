import { expect } from '@playwright/test';

export class OpenCustomerPage {
  constructor(page) {
    this.page = page;
    this.dropdownCurrency = this.page.locator('#currency');
    this.dropdownUser = this.page.locator("#userSelect");
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency( currency = 'Dollar') {
    await this.dropdownCurrency.selectOption(currency);
  }

  async assertCurrencyOptionToHaveValue (option) {
    await expect(this.dropdownCurrency).toHaveValue(option);
  }

  async selectUser(userFirstName, userLastName) {
    const fullName = `${userFirstName} ${userLastName}`
    await this.dropdownUser.selectOption(fullName);
  }

  async clickProcessButton() {
    await this.page.getByRole('button', { name: 'Process' }).click();
  }

  async reloadPage(){
    await this.page.reload();
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async goToCustomerPage() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }
}
