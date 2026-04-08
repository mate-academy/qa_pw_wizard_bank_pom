export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[ng-model="searchCustomer"]');
  }

  async search(value) {
    await this.searchInput.fill(value);
  }
}
