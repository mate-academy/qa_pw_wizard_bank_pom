import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.bankLoginButton = page.getByRole('button', {
      name: 'Bank Manager Login'
    });

    this.addCustomerButton = page.getByRole('button', {
      name: 'Add Customer'
    });

    this.openAccountButton = page.getByRole('button', {
      name: 'Open Account'
    });

    this.customersButton = page.getByRole('button', {
      name: 'Customers'
   });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

}

