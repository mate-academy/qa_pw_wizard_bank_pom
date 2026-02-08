import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', {name: 'Add Customer'});
    this.openAccountButton = page.getByRole('button', {name: 'Open Account'});
    this.customersButton = page.getByRole('button', {name: 'Customers'});
  }

  // відкриття сторінки з логіном менеджера
  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  // перевірка, чи кнопка "Add Customer" видима на сторінці 
  async isAddCustomerButtonVisible () {
    await expect(this.addCustomerButton).toBeVisible();
  }

  // перевірка, чи кнопка "Open Account" видима на сторінці 
  async isOpenAccountButtonVisible () {
    await expect(this.openAccountButton).toBeVisible();
  }

  // перевірка, чи кнопка "Customers" видима на сторінці 
  async isCustomersButtonVisible () {
    await expect(this.customersButton).toBeVisible();
  }
  
}
