import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.getByRole('row').last();
    this.lastRowFirstCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowSecondCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowThirdCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowFourthCell = this.lastRow.getByRole('cell').nth(3);
    this.deleteCustomerButton = this.lastRow.getByRole('button', { name: 'Delete' });
    this.searchField = page.getByPlaceholder('Search Customer');
  }
  

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

   async assertLastRowFirstCellContainsText(text) {
    await expect(this.lastRowFirstCell).toContainText(text);
  }

  async assertLastRowSecondCellContainsText(text) {
    await expect(this.lastRowSecondCell).toContainText(text);
  }

  async assertLastRowThirdCellContainsText(text) {
    await expect(this.lastRowThirdCell).toContainText(text);
  }

  async assertLastRowFourthCellIsEmpty() {
    await expect(this.lastRowFourthCell).toHaveText('');
  }
  
  async assertLastRowFourthCellIsNotEmpty() {
    await expect(this.lastRowFourthCell).not.toHaveText('');
  }

  async clickDeleteCustomerButton() {
    await this.deleteCustomerButton.click();
  }

  async assertCustomerRowIsHidden(customerName) {
  await expect(
    this.page.getByRole('row').filter({ hasText: customerName })
  ).toBeHidden();
  }

  async assertCustomerRowIsVisible(customerName) {
  await expect(
    this.page.getByRole('row').filter({ hasText: customerName })
  ).toBeVisible();
  }

  async assertRowCount(count) {
    await expect(this.page.getByRole('row')).toHaveCount(count + 1); // +1 для заголовка
  }

  async reload() {
    await this.page.reload();
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
}
}
