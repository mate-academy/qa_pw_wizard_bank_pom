import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.customerNameField = page.getByPlaceholder("First Name");
    this.customerLastnameField = page.getByPlaceholder("Last Name");
    this.customerPostalCode = page.getByPlaceholder("Post Code");
    this.customerAddClick = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
    this.customerListClick = page.getByRole("button", { name: "Customers" });
    this.openAccounLink = page.getByRole("button", { name: "Open Account" });
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
  }

  async customerName(firstName) {
    await this.customerNameField.fill(firstName);
  }

  async customerLastname(lastName) {
    await this.customerLastnameField.fill(lastName);
  }

  async customerPostal(postCode) {
    await this.customerPostalCode.fill(postCode);
  }

  async customerAdd() {
    await this.customerAddClick.click();
  }

  async customerList() {
    await this.customerListClick.click();
  }

  async openAccount() {
    await this.openAccounLink.click();
  }
}
