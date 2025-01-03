import { th } from '@faker-js/faker';

const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.userSelectDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' })
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reloadPage() {
    await this.page.reload();
  }

  async selectOption(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async currentOptionValue(value) {
    const currentOption = await this.currencyDropdown.inputValue();
    expect(currentOption).toBe(value);
  }

  async selectUserOption(user) {
    await this.userSelectDropdown.selectOption(user);
  }

  async clickprocessButton() {
    await this.processButton.click();
  }
}