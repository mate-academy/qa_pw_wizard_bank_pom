import { expect } from "@playwright/test";

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('input[ng-model="searchCustomer"]');

    this.tableRows = page.locator("table tbody tr");

    this.deleteBtn = page.locator('button[ng-click="deleteCust(cust)"]');
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }

  async search(text) {
    await this.searchInput.fill(text);
  }

  async deleteFirstCustomer() {
    await this.deleteBtn.first().click();
  }
}
