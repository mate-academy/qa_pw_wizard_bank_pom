import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTable = page.getByRole('table');
     this.rows = page.locator('table tbody tr');
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async checkCustomerFirstName(text) {
    await expect(this.rows.last()).toBeVisible();
    await expect(this.rows.last()).toContainText(text);
  }
  async checkCustomerLastName(text) {
    await expect(this.rows.last()).toBeVisible();
    await expect(this.rows.last()).toContainText(text);
  }
  async checkCustomerPostCode(text) {
    await expect(this.rows.last()).toBeVisible();
    await expect(this.rows.last()).toContainText(text);
  }

  async deleteCreatedUser(customerLastName) {
  const row = this.rows.filter({ hasText: customerLastName });
  await row.locator('button:has-text("Delete")').click();
  }
  async checkCustomerLastNameIsAbsent(lastName) {
  await expect(this.rows.filter({ hasText: lastName })).toHaveCount(0);
}
async fillSearchCustomerField(text) {
  await this.searchCustomerField.fill(text);
}

async checkCustomerData(text) {
    await expect(this.rows.last()).toBeVisible();
    await expect(this.rows.last()).toContainText(text);
  }
async checkCustomerRowPresent() {
    await expect(this.rows).toHaveCount(1); 
    // має бути лише один рядок після пошуку
  }


}

