export class CustomersListPage {
  constructor(page) {
    this.page = page;
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

  getFirstNameCell(firstName, lastName) {
    return this.getCustomerRow(firstName, lastName).locator('td').nth(0);
  }

  getLastNameCell(firstName, lastName) {
    return this.getCustomerRow(firstName, lastName).locator('td').nth(1);
  }

  getPostalCodeCell(firstName, lastName) {
    return this.getCustomerRow(firstName, lastName).locator('td').nth(2);
  }

  getAccountNumberCell(firstName, lastName) {
    return this.getCustomerRow(firstName, lastName).locator('td').nth(3);
  }

  async clickDelete(firstName, lastName) {
    await this.getCustomerRow(firstName, lastName)
      .getByRole('button', { name: 'Delete' })
      .click();
  }
}