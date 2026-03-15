import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('select[ng-model="currency"]');
    this.customerSelect = page.locator('select[ng-model="custId"]');

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }


    async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }



  async selectCustomer(customer) {
  await this.customerSelect.selectOption({ label: customer });
 }
  
  async clickProcessButton() {
  await this.page.getByRole('button', { name: 'Process' }).click();  
  }


  }

