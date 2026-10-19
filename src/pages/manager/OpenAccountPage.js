import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelector = page.getByTestId('userSelect');
    this.currencySelector = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async reload(){
    await this.page.reload();
  }

  async selectCurrencyValue(value){
    await this.currencySelector.selectOption(value);
  }

  async assertDropDownValue(value){
    await expect(this.currencySelector).toContainText(value);
  }

  async selectCustomer(firstName, lastName){
    await this.customerSelector.selectOption(`${firstName} ${lastName}` );
  }

  async clickProcessButton(){
    await this.processButton.click();
  }
}
