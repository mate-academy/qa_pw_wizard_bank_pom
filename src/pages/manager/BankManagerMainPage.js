import { expect } from '@playwright/test';
import { BasePage } from '../../BasePage.js';

export class BankManagerMainPage extends BasePage {
  constructor(page) {
    super(page);
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async assertManagerPageIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async goToAddCustomer() {
    await this.addCustomerButton.click();
  }

  async goToOpenAccount() {
    await this.openAccountButton.click();
  }

  async goToCustomers() {
    await this.customersButton.click();
  }
}
