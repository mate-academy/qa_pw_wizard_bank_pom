import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer" });
    this.openAccountButton = page.getByRole("button", { name: "Open Account" });
    this.customersButton = page.getByRole("button", { name: "Customers" });
    this.firstNamelabel = page.getByRole("label", { name: "First Name" });
    this.firstNameField = page.getByPlaceholder("First Name");
    this.lastNameLabel = page.getByRole("label", { name: "Last Name" });
    this.lastNameField = page.getByPlaceholder("Last Name");
    this.postCodeLabel = page.getByRole("label", { name: "Post Code" });
    this.postCodeField = page.getByPlaceholder("Post Code");
    this.addCustomerSubmitButton = page
      .getByRole("button", {
        name: "Add Customer",
      })
      .nth(1);
    this.homeButton = page.getByRole("button", { name: "Home" });
    this.mainHeaderTitle = page.getByText("XYZ Bank");
  }
  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
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
  async inputFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  }
  async inputLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  }
  async inputPostCodeField(postCode) {
    await this.postCodeField.fill(postCode);
  }
  async clickAddCustomerSubmitButton() {
    await this.addCustomerSubmitButton.click();
  }
  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
