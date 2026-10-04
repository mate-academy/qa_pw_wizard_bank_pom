import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rowWithNewCustomer = page.getByRole('row').last();
    this.accountNumberInNewCustomer = this.rowWithNewCustomer.getByRole('cell').nth(3);
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerFirstNameIsVisible(firstName) {
    await expect(this.rowWithNewCustomer).toContainText(firstName);
  }

  async assertCustomerLastNameIsVisible(lastName) {
    await expect(this.rowWithNewCustomer).toContainText(lastName);
  }

  async assertCustomerPostCodeIsVisible(postCode) {
    await expect(this.rowWithNewCustomer).toContainText(postCode);
  }

  async assertAccountNumberIsEmpty(isEmpty) {
    if (isEmpty) {
      await expect(this.accountNumberInNewCustomer).toHaveText('');
    } else {
      await expect(this.accountNumberInNewCustomer).not.toHaveText('');
    }
  }

   getCustomerRow(firstName, lastName, postalCode) {
      return this.page.getByRole('row')
          .filter({ hasText: firstName })
          .filter({ hasText: lastName })
          .filter({ hasText: postalCode });
  }


  async clickDeleteCustomerBtn(firstName, lastName, postCode) {
    await this.getCustomerRow(firstName, lastName, postCode)
        .getByRole('button', {name: 'Delete'})
        .click();
  }

  async customerRowIsNotPresent(firstName, lastName, postalCode) {
    await expect(
        this.getCustomerRow(firstName, lastName, postalCode)
    ).toHaveCount(0);
  }

  async fillSearchField(value) {
    await this.searchCustomerField.fill(value);
  }

  async assertSearchValueCustomerIsPresent(searchValue) {
    const customer = this.getCustomerRowBySearchValue(searchValue);

    await expect(customer).toHaveCount(1);
  }

  async assertSingleSearchResult() {
    const customerRow = this.page
        .getByRole('table')
        .getByRole('row')
        .filter({
          has: this.page.getByRole('button', { name: 'Delete' })
        });

    await expect(customerRow).toHaveCount(1);
  }

   getCustomerRowBySearchValue(searchValue) {
    return this.page
        .getByRole('row')
        .filter({ hasText: searchValue });
  }

}
