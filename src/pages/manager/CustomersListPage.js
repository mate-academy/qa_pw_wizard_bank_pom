import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.clickDeleteCustomer = page.getByRole('row', { name: 'Harry Potter 666 Delete' }).getByRole('button');
    this.searchFill = page.getByPlaceholder('Search Customer');
   
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async selectT ( firstName, lastName, postCode, accountNumber, visible) {


    const customerRow = this.page.getByRole('row')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postCode })
      .filter({ hasText: accountNumber })

      if (visible) {
      await expect (customerRow).toBeVisible();

      } else {
              await expect (customerRow).toBeHidden();

      }

   
  }
  async deleteCustomer () {
    await this.clickDeleteCustomer.click();
  }
  async assertAccountNotEmpty (firstName) {

    const customerRow = this.page.getByRole('row').filter({ hasText: firstName });
    
    const accountCell = customerRow.getByRole('cell').nth(3);
    
    await expect(accountCell).not.toBeEmpty();

  }
  async search (searchTerm) {
    await this.searchFill.fill(searchTerm);
    expect (this.searchFill).toHaveValue(searchTerm);
  }
}
