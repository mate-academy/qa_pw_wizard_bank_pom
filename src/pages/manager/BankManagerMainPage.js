import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name : 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name : 'Open Account' });
    this.customerButton = page.getByRole('button', { name : 'Customers' });


  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async waitForManagerMainPage(){
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
  }




}
