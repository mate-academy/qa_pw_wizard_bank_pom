import { expect } from '@playwright/test';

export class CustomerLoginPage {
  constructor(page) {
    this.page = page;
    this.customersDropDown = page.getByTestId('userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/customer');
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/customer',
    );
  }

  async selectCustomer(customerName) {
    await this.customersDropDown.selectOption(customerName);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async assertSelectCustomerDropdownIsVisible() {
    await expect(this.customersDropDown).toBeVisible();
  }

  async assertSelectCustomerDropdownContainsValue(value) {
    const currentOptionText = this.customersDropDown;
    await expect(currentOptionText).toHaveValue(value);
  }
}
