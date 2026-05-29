import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.lastRow = page.getByRole('row').last();
    this.deleteLastRow = this.lastRow.getByRole('button');
    this.searchInput = page.getByPlaceholder('Search Customer');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickCustomerButton() {
    await this.customerButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async clickDeleteButton() {
    await this.deleteLastRow.click();
  }

  async getLastRowName() {
    return await this.lastRow.getByRole('cell').first().textContent();
  }

  async assertRowNotPresent(customerName) {
    await expect(this.page.getByText(customerName)).not.toBeVisible();
  }

  async fillInSearchInput(value) {
    await this.searchInput.fill(value);
  }

}