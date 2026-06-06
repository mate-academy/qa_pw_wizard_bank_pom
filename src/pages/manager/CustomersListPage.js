import { expect } from "@playwright/test";

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer" });
    this.openAccountButton = page.getByRole("button", { name: "Open Account" });
    this.customersButton = page.getByRole("button", { name: "Customers" });
    this.homeButton = page.getByRole("button", { name: "Home" });
    this.mainHeaderTitle = page.getByText("XYZ Bank");
    this.searchCustomerField = page.getByPlaceholder("Search Customer");
    this.firstNameHeader = page.getByText("Firtst Name");
    this.lastNameHeader = page.getByText("Last Name");
    this.postCodeHeader = page.getByText("Post Code");
    this.accountNumberHeader = page.getByText("Account Number");
    this.deleteCustomerHeader = page.getByText(" Delete Customer");
    this.deleteButton = page.getByRole("button", { name: "Delete" });
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }
  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }
  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }
  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
  async assertHomeButtonIsVisible() {
    await expect(this.homeButton).toBeVisible();
  }
  async assertMainHeaderTitleIsVisible() {
    await expect(this.mainHeaderTitle).toBeVisible();
  }
  async assertSearchCustomerFieldIsVisible() {
    await expect(this.searchCustomerField).toBeVisible();
  }
  async inputSearchCustomerField(input) {
    await this.searchCustomerField.fill(input);
  }
  async assertFirstNameHeaderIsVisible() {
    await expect(this.firstNameHeader).toBeVisible();
  }
  async assertLastNameHeaderIsVisible() {
    await expect(this.lastNameHeader).toBeVisible();
  }
  async assertPostCodeHeaderIsVisible() {
    await expect(this.postCodeHeader).toBeVisible();
  }
  async assertAccountNumberHeaderIsVisible() {
    await expect(this.accountNumberHeader).toBeVisible();
  }
  async assertDeleteCustomerHeaderIsVisible() {
    await expect(this.deleteCustomerHeader).toBeVisible();
  }
  async assertDeleteButtonsAreVisible() {
    await expect(this.deleteButton.first()).toBeVisible();
  }
}
