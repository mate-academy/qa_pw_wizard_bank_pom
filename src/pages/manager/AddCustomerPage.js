import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.firstNameInputField = page.getByPlaceholder("First Name");
    this.lastNameInputField = page.getByPlaceholder("Last Name");
    this.postCodeInputField = page.getByPlaceholder("Post Code");

    this.addCustomerButton = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
  }

  async reload() {
    await this.page.reload();
  }

  async fillFirstNameInputField(firstName) {
    await this.firstNameInputField.fill(firstName);
  }

  async fillLastNameInputField(lastName) {
    await this.lastNameInputField.fill(lastName);
  }

  async fillPostCodeInputField(postCode) {
    await this.postCodeInputField.fill(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
}
