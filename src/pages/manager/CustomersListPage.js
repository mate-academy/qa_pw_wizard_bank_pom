import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRows = page.getByRole('row');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }
  
  async waitForURL() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertLastRowFirstName(firstName) {
    await expect(this.customerRows.last().locator('td').nth(0)).toHaveText(firstName);
  }

  async assertLastRowLastName(lastName) {
    await expect(this.customerRows.last().locator('td').nth(1)).toHaveText(lastName);
  }

  async assertLastRowPostCode(postCode) {
    await expect(this.customerRows.last().locator('td').nth(2)).toHaveText(postCode);
  }

  async getLastRowAccountNumber() {
    const lastRow = this.page.getByRole('row').last();
    const accountCell = lastRow.locator('td').nth(3); 
    let accountNumber = await accountCell.textContent();
    return accountNumber;
  }

  async assertLastRowNotEmpty() {
    await expect(this.page.locator('tbody tr').last().locator('td').nth(0)).not.toBeEmpty();

  }

  async assertLastRowHasNoAccountNumber() {
    await expect(this.customerRows.last().locator('td').nth(3)).toHaveText('');
  }  

    async deleteCustomerByName(firstName, lastName) {
    const targetRow = this.customerRows.filter({
      hasText: firstName,
    }).filter({
      hasText: lastName,
    });

    const deleteButton = targetRow.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

  async assertCustomerPresentByFirstName(firstName) {
    const targetRow = this.customerRows.filter({ hasText: firstName });
    await expect(targetRow).toContainText(firstName);
  }

  async assertCustomerPresentByLastName(lastName) {
    const targetRow = this.customerRows.filter({ hasText: lastName });
    await expect(targetRow).toContainText(lastName);
  }

  async assertCustomerPresentByPostalCode(postalCode) {
    const targetRow = this.customerRows.filter({ hasText: postalCode });
    await expect(targetRow).toContainText(postalCode);
  }

  async assertCustomerNotPresent(firstName, lastName) {
  const targetRow = this.customerRows.filter({ hasText: firstName }).filter({ hasText: lastName });
  await expect(targetRow).toHaveCount(0);
}

  async fillSearchFieldByFirstName(firstName) {
    const searchField = this.page.getByPlaceholder('Search Customer');
    await searchField.fill(firstName); 
  }

    async fillSearchFieldByLastName(lastName) {
    const searchField = this.page.getByPlaceholder('Search Customer');
    await searchField.fill(lastName); 
  }

    async fillSearchFieldByPostalCode(postalCode) {
    const searchField = this.page.getByPlaceholder('Search Customer');
    await searchField.fill(postalCode); 
  }

async assertSearchResultsContainOnlyFirstName(firstName) {
  const rowCount = await this.customerRows.count();
  expect(rowCount).toBeGreaterThan(0);

// starting loop from i = 1 because .nth[0] is the header of the search results table;
// Second .nth(0) is the column for First Name

  for (let i = 1; i < rowCount; i++) {
    const cell = this.customerRows.nth(i).getByRole('cell').nth(0);
    await expect(cell).toContainText(firstName);
  }
  }

async assertSearchResultsContainOnlyLastName(lastName) {
  const rowCount = await this.customerRows.count();
  expect(rowCount).toBeGreaterThan(0);

// starting loop from i = 1 because .nth[0] is the header of the search results table;
// Second .nth(1) is the column for Last Name

  for (let i = 1; i < rowCount; i++) {
    const cell = this.customerRows.nth(i).getByRole('cell').nth(1);
    await expect(cell).toContainText(lastName);
  }
}

async assertSearchResultsContainOnlyPostalCode(postalCode) {
  const rowCount = await this.customerRows.count();
  expect(rowCount).toBeGreaterThan(0);

// starting loop from i = 1 because .nth[0] is the header of the search results table;
// Second .nth(2) is the column for Postal Code

  for (let i = 1; i < rowCount; i++) {
    const postCodeCell = this.customerRows.nth(i).getByRole('cell').nth(2);
    await expect(postCodeCell).toContainText(postalCode);
  }
}

}