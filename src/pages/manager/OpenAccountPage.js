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

  // перевірка появи діалогового вікна
  async clickProcessButtonAndHandleDialog() {

    const dialogPromise = this.page.waitForEvent('dialog');

    const clickPromise = this.processButton.click();

    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('Account created successfully with account Number');

    await dialog.accept();

    await clickPromise;

  }

  // перевіряємо наявність валюти у випадаючому списку
  async assertCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  // вибираємо користувача по імені у випадаючому списку
  async selectCustomer(firstName, lastName) {
    await this.customerDropdown.selectOption(`${firstName} ${lastName}`);
  }
  
  // обираємо валюту з випадаючого списку
  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }
}
