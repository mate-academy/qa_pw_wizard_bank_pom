import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelector = page.getByTestId('currency');
    this.customerSelector = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencySelector.selectOption(currency);
  }

  async selectCustomer(firstName, lastName) {
    await this.customerSelector.selectOption(`${firstName} ${lastName}`);
  }

  async assertSelectedCurrency(currency) {
    await expect(this.currencySelector).toContainText(currency);
    //TODO Розбіратись як перевірити що значення вибране, 
    // а не просто є в дропдауні
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reload() {
    await this.page.reload();
  }


}
