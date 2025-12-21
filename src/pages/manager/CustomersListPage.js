import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('tbody tr');
    this.SearchCustomerField = page.getByPlaceholder('Search Customer');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

    async reload() {
    await this.page.reload();
  }
  
    getLastRow() {
    return this.rows.last();
  }

    async assertFirstNameInLastRow(expectedFirstName) {
    await expect(this.getLastRow().locator('td').nth(0)).toHaveText(expectedFirstName);
  }

   async assertLastNameInLastRow(expectedLastName) {
    await expect(this.getLastRow().locator('td').nth(1)).toHaveText(expectedLastName);
   }

   async assertPostalCodeInLastRow(expectedCode) {
    await expect(this.getLastRow().locator('td').nth(2)).toHaveText(expectedCode);
   }

   async assertAccountNumberIsEmptyInLastRow() {
    await expect(this.getLastRow().locator('td').nth(3)).toBeEmpty();
   }

   async clickDeleteInLastRow() {
   await this.getLastRow().getByRole('button', { name: 'Delete' }).click();
  }

   async assertCustomerNotPresent(firstName) {
   await expect(this.rows.filter({ hasText: firstName })).toHaveCount(0);
  }

    async assertAccountNumberIsNotEmptyInLastRow() {
    await expect(this.getLastRow().locator('td').nth(3)).not.toBeEmpty();
  }

    async searchCustomer(searchText) {
    await this.SearchCustomerField.fill(searchText);
  }

   async assertCustomerIsPresent(text) {
    await expect(this.rows.first()).toContainText(text);
  }
   
    async assertOnlyOneRowIsDisplayed() {
    await expect(this.rows).toHaveCount(1);
  }
}






