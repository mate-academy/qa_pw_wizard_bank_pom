import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.getByRole('row').last();
    this.customerRow = page.getByRole('row');
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async assertCustomerFirstName(value) {
   await expect(this.lastRow).toContainText(value);
  }

  async assertCustomerLastName(value) {
   await expect(this.lastRow).toContainText(value);
  }

  async assertCustomerPostCode(value) {
   await expect(this.lastRow).toContainText(value);
  }


  async assertAccountNumberIsEmpty() {
    await expect(this.lastRow.getByRole('cell').nth(3)).toHaveText('');
  }

  async assertAccountNumberIsNotEmpty() {
    await expect(this.lastRow.getByRole('cell').nth(3)).not.toHaveText('');
  }  

  async clickDeleteButtonForUser(firstName) {
    await this.page.getByRole('row').filter({hasText: firstName}).getByRole('button').click();
  }

  async assertCustomerDoesNotExist(firstName) {
    await expect(this.customerRow.filter({hasText: firstName})).toBeHidden();
  }

   async assertCustomerExist(firstName, lastName) {
    await expect(this.customerRow.filter({hasText: `${firstName} ${lastName}`})).toBeVisible();
  }

  async fillSearchCustomerField(searchTerm) {
    await this.searchCustomerField.fill(searchTerm);
  }

  async assertNoOtherRows() {
    await expect(this.page.getByRole('row')).toHaveCount(2);
    //TODO  сумнівна перевірка, було добре щось краще зробити
  }


}
