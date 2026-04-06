import { expect } from "@playwright/test";

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.customersButton = page.getByRole("button", { name: "Customers" });

    this.lastRow = page.getByRole("row").last();
    this.firstNameCell = this.lastRow.getByRole("cell").nth(0);
    this.lastNameCell = this.lastRow.getByRole("cell").nth(1);
    this.postCodeCell = this.lastRow.getByRole("cell").nth(2);
    this.accountNumberCell = this.lastRow.getByRole("cell").nth(3);

    this.searchCustomerInputField = page.getByPlaceholder("Search Customer");

    this.bodyRows = page.locator("tbody").getByRole("row");
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }

  async reload() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertLastRowFirstNameContains(firstName) {
    await expect(this.firstNameCell).toContainText(firstName);
  }

  async assertLastRowLastNameContains(lastName) {
    await expect(this.lastNameCell).toContainText(lastName);
  }

  async assertLastRowPostCodeContains(postCode) {
    await expect(this.postCodeCell).toContainText(postCode);
  }

  async assertLastRowAccountNumberNotEmpty() {
    await expect(this.accountNumberCell).not.toBeEmpty();
  }

  async assertLastRowHasNoAccountNumber() {
    await expect(this.accountNumberCell).toBeEmpty();
  }

  async assertRowWithFirstNameNoLongerExists(firstName) {
    const filteredRow = this.page
      .getByRole("row")
      .filter({ hasText: firstName });
    await expect(filteredRow).toHaveCount(0);
  }

  async assertOnlyOneRowExists() {
    await expect(this.bodyRows).toHaveCount(1);
  }

  async deleteCustomerByFirstName(firstName) {
    const filteredRow = this.page
      .getByRole("row")
      .filter({ hasText: firstName });
    const deleteButton = filteredRow.getByRole("button", { name: "Delete" });
    await deleteButton.click();
  }

  async fillCustomerSearchInputField(customerName) {
    await this.searchCustomerInputField.fill(customerName);
  }
}
