import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRows = page.locator('tbody tr');
    this.lastCustomerRow = page.locator('tbody tr').last();
    this.deleteCustomerButton = this.lastCustomerRow.locator('button', { hasText: 'Delete' });
    this.customerFirstName = this.lastCustomerRow.getByRole('cell').nth(0);
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteButton() {
    await this.deleteCustomerButton.click();
  }

  async assertCustomerRowIsNotPresentInTheTable(firstName) {
    await expect(this.page.getByRole('row', { name: firstName })).toBeHidden();
  }

  async fillSearchField(firstName) {
    await this.searchCustomerInput.fill(firstName);
  }

  async assertCustomerRowIsPresentInTheTable(firstName) {
    await expect(this.page.getByRole('row', { name: firstName })).toBeVisible();
  }

  async assertOnlyOneCustomerRowIsPresent() {
    await expect(this.customerRows).toHaveCount(1);
  }

}
