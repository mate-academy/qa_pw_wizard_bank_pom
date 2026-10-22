export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.locator('tbody tr').last();
    this.firstNameCell = this.lastRow.locator('td').nth(0);
    this.lastNameCell = this.lastRow.locator('td').nth(1);
    this.postalCodeCell = this.lastRow.locator('td').nth(2);
    this.accountNumberCell = this.lastRow.locator('td').nth(3);
    this.searchField = page.getByPlaceholder('Search Customer');
    this.allRows = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearch(text) {
    await this.searchField.fill(text);
  }

  getCustomerRow(firstName, lastName) {
    return this.page
      .locator('tbody tr')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });
  }

  async clickDelete(firstName, lastName) {
    await this.getCustomerRow(firstName, lastName)
      .getByRole('button', { name: 'Delete' })
      .click();
  }
}