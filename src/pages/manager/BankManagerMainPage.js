import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCustomerButton = page.getByRole('button', {
      name: 'Add Customer',
    });

    this.customersButton = page.getByRole('button', {
      name: 'Customers',
    });

    this.openAccountButton = page.getByRole('button', {
      name: 'Open Account',
    });

    this.bankManagerLoginButton = page.getByRole('button', {
      name: 'Bank Manager Login',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager',
    );
  }

  async openLoginPage() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/login',
    );
  }

  async clickManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
}