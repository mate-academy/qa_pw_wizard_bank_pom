import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.customerDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', {name: 'Process'});
  }

  // відкриття сторінки open account
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  // перезавантаження сторінки
  async reload() {
    await this.page.reload();
  }

  // перевіряємо наявність валюти у випадаючому списку
  async assertCurrency(currency) {
    this.currencyDropdown.selectOption(currency);
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  // вибираємо користувача по імені у випадаючому списку
  async selectCustomer(firstName, lastName) {
    await this.customerDropdown.selectOption(`${firstName} ${lastName}`);
  }
  
  // обираємо валюту з випадаючого списку
  async selectCurrency(currency) {
    this.currencyDropdown.selectOption(currency);
  }

  // клік на кнопку Process
  async clickProcessButton() {
    await this.processButton.click();
  }
}
