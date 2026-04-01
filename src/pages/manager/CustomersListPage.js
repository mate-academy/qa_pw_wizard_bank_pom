import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
    this.firstTableRow = page.getByRole('row').last();
    this.deleteCustomerButton = page.getByRole('row').last().getByRole('button', {
      name: 'Delete',
    });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchCustomerInput(customer) {
    await this.searchCustomerInput.fill(customer);
  }
  async clickDeleteCustomerButton() {
    await this.deleteCustomerButton.click();
  }
  async assertFirstTableRowContainsText(text) {
  await expect(this.firstTableRow).toContainText(text);
}
  async assertFirstTableRowNotContainsText(text) {
    await expect(this.firstTableRow).not.toContainText(text);
  }
 async assertLastRowAccountNumberIsNotEmpty() {
  const accountCell = this.page.getByRole('row').last().getByRole('cell').nth(3);
  await expect(accountCell).not.toHaveText('');
}
async assertLastRowAccountNumberIsEmpty() {
  const accountCell = this.page.getByRole('row').last().getByRole('cell').nth(3);
  await expect(accountCell).toHaveText('');
}
async assertOnlyOneRowIsVisible() {
  const rows = this.page.getByRole('row');
  await expect(rows).toHaveCount(2); // 1 header + 1 data row
}
}
