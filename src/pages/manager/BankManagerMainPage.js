const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page; 
    this.ManagerLoginBtn = page.getByRole('button', {name: 'Bank Manager Login'});
    this.AddCustomerBtn = page.getByRole('button', {name: 'Add Customer'});
    this.OpenAccBtn = page.getByRole('button', {name: 'Open Account'});
    this.CustomersBtn = page.getByRole('button', {name: 'Customers'});
  }

  async ManagerLogin() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
    await this.ManagerLoginBtn.click();
  }

  async checkManagerPageElements(){
    await expect(this.AddCustomerBtn).toBeVisible();
    await expect(this.OpenAccBtn).toBeVisible();
    await expect(this.CustomersBtn).toBeVisible();
  }
}