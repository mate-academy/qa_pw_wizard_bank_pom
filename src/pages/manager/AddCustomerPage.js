import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postCodeInput = page.getByPlaceholder("Post Code");
    this.addCustomerButton = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
    this.customerTab = page.getByRole("button", { name: "Customers" });
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
  }
  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    await this.addCustomerButton.click();
  }
  async goCustomersTab() {
    await this.customerTab.click();
  }
}
