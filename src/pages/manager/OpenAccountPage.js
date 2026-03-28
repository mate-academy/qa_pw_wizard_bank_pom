import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.processButton = page.getByRole('button', {name: 'Process'});
    this.currency = page.locator('#currency');
  
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(firstName, lastName){
   await this.page.locator('#userSelect').selectOption({ label: `${firstName} ${lastName}` })
  }
  async selectCurrency(currency){
   await this.page.locator('#currency').selectOption(currency)
  }
}
