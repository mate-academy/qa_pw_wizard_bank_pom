import { expect } from "@playwright/test";

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRows = page.locator("tr.ng-scope");
    this.searchCustomerField = page.getByPlaceholder("Search Customer");
  }
  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }

  async assertCustomerFirstNameIsPresent(firstName) {
    await expect(this.customerRows.last()).toContainText(firstName);
  }
  async assertCustomerLastNameIsPresent(lastName) {
    await expect(this.customerRows.last()).toContainText(lastName);
  }

  async assertPostalCodeIsPresent(zipCode) {
    await expect(this.customerRows.last()).toContainText(zipCode);
  }

  async assertAccountNumberIsEmpty() {
    await expect(this.customerRows.last().locator("td").nth(3)).toBeEmpty();
  }

  async clickCustomerDeleteButton(firstName, lastName, zipCode) {
    this.deleteCustomerRow = this.page.getByRole("row", {
      name: `${firstName} ${lastName} ${zipCode}`,
    });

    await this.deleteCustomerRow.getByRole("button").click();
  }

  async assertCustomerRowIsNotPresentInTable(firstName, lastName, zipCode) {
    await expect(
      this.page.getByRole("row", {
        name: `${firstName} ${lastName} ${zipCode}`,
      }),
    ).not.toBeVisible();
  }

  async assertAccountNumberIsNotEmpty(firstName, lastName) {
    const customerRow = this.customerRows.filter({
      hasText: `${firstName} ${lastName}`,
    });

    await expect(customerRow.locator("td").nth(3)).not.toBeEmpty();
  }

  async fillFirstNameInSearchField(firstName) {
    await this.searchCustomerField.fill(firstName);
  }

  async assertCustomerRowIsPresentInTable(firstName) {
    await expect( ( this.customerRows).filter({hasText: firstName})).toBeVisible()
  }

  async assertNoOtherRowsArePresent() {
  await expect(this.customerRows).toHaveCount(1);


}

 async fillLastNameInSearchField(lastName) {
    await this.searchCustomerField.fill(lastName);
  }

 async assertCustomerRowIsPresentInTable(lastName) {
    await expect( ( this.customerRows).filter({hasText: lastName})).toBeVisible()
  }

  async fillZipCodeInSearchField(zipCode) {
    await this.searchCustomerField.fill( zipCode);
  }

  async assertCustomerRowIsPresentInTable(zipCode) {
    await expect( ( this.customerRows).filter({hasText: zipCode})).toBeVisible()
  }
}
