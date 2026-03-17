import { expect } from "@playwright/test";

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }
  async waitForLoading() {
    await this.page.waitForURL(
      "/angularJs-protractor/BankingProject/#/manager/list",
    );
  }
  async getLastCustomerRow() {
    return this.page
      .locator(".table.table-bordered.table-striped tbody tr")
      .last();
  }
  async assertCustomerAdded(firstName, lastName, postCode) {
    const lastRow = await this.getLastCustomerRow();
    await expect(lastRow).toContainText(firstName);
    await expect(lastRow).toContainText(lastName);
    await expect(lastRow).toContainText(postCode);
  }

  async getCustomerCell(person, columnIndex) {
    return this.page
      .locator("tbody tr")
      .filter({ hasText: `${person.firstName} ${person.lastName}` })
      .locator("td")
      .nth(columnIndex);
  }

  async assertCellIsEmpty(person, columnIndex) {
    const cellLocator = await this.getCustomerCell(person, columnIndex);
    await expect(cellLocator).toBeEmpty();
  }

  async assertCellNotEmpty(person, columnIndex) {
    const cellLocator = await this.getCustomerCell(person, columnIndex);
    await expect(cellLocator).not.toBeEmpty();
  }

  async deleteCustomerUser(person) {
    const customerRow = this.page
      .locator(".table.table-bordered.table-striped tbody tr")
      .filter({ hasText: `${person.firstName} ${person.lastName}` });
    const customerRowDeleteButton = customerRow.getByRole("button", {
      name: "Delete",
    });
    await customerRowDeleteButton.click();
  }
  async verifyDeleteCustomerUser(person) {
    const customerRow = this.page
      .locator(".table.table-bordered.table-striped tbody tr")
      .filter({ hasText: `${person.firstName} ${person.lastName}` });

    await expect(customerRow).not.toBeVisible();
  }
  async assertAccountCellNotEmpty(person, columnIndex) {
    const cellLocator = this.getCustomerCell(person, columnIndex);
    await expect(cellLocator).not.toBeEmpty();
  }
  async searchCustomerByPersonalData(value) {
    const searchInput = this.page.getByPlaceholder("Search Customer");
    await searchInput.fill(value);
  }
  async customerUser(value) {
    return this.page
      .locator(".table.table-bordered.table-striped tbody tr")
      .filter({ hasText: value });
  }

  async customerUserIsPresent(value) {
    const custUser = await this.customerUser(value);
    await expect(custUser).toHaveCount(1);
  }
}
