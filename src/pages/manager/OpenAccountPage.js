import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currency = page.getByTestId('currency');
    this.processButton = page
      .getByRole('form')
      .getByRole('button', { name: 'Process' });
    this.customer = page.locator('#userSelect');
  
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currency.selectOption({ label: currency });
  }

  async assertCurrencyIsSelected(currency) {
    await expect(this.currency).toHaveValue(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async selectCustomerByName(firstName, lastName) {
    const customerLabel = `${firstName} ${lastName}`; 
    await this.customer.selectOption({ label: customerLabel });
  }

  async acceptDialogWindowMessage() {
    this.page.on('dialog', (dialog) => dialog.accept());
  }

}
