import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page, firstName, lastName, postCode) {
    this.page = page;
    this.firstName = firstName;
    this.lastName = lastName;
    this.postCode = postCode;
    this.rows = page.locator('table tbody tr');
    this.lastRow = this.page.locator('table tbody tr').last();
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

    async assertCustomerDataInLastRow(firstName, lastName, postCode) {
    const cells = this.lastRow.locator('td');
    await expect(cells.nth(0)).toHaveText(firstName);
    await expect(cells.nth(1)).toHaveText(lastName);
    await expect(cells.nth(2)).toHaveText(postCode);
    
  }
  
  async assertNoAccountNumberInLastRow() {
  const accountCell = this.lastRow.locator('td').nth(3);
  await expect(accountCell).toBeEmpty();
  }

  async clickDeleteCustomerButton() {
    const row = this.page.locator('tr', { hasText: this.firstName });
    await expect(row).toContainText(this.lastName); 
    const deleteButton = row.locator('button', { hasText: 'Delete' });
    await deleteButton.click();
  }

  async assertCustomerNotPresent() {
  const row = this.page.locator('tr', { hasText: this.firstName });
  await expect(row).toHaveCount(0);
  }

  async assertAccountNumberIsNotEmptyInLastRow() {
  const accountCell = this.lastRow.locator('td').nth(3); 
  await expect(accountCell).not.toBeEmpty();
}

async fillSearchField(firstName) {
  await this.searchField.fill(firstName);
}

async fillSearchField(lastName) {
  await this.searchField.fill(lastName);
}

async fillSearchField(postalCode) {
  await this.searchField.fill(postalCode);
}

async assertOnlyOneRowWithCustomerData(firstName, lastName, postalCode) {
  await expect(this.rows).toHaveCount(1);
  const cells = this.rows.first().locator('td');
  await expect(cells.nth(0)).toHaveText(firstName);
  await expect(cells.nth(1)).toHaveText(lastName);
  await expect(cells.nth(2)).toHaveText(postalCode);
}

}
