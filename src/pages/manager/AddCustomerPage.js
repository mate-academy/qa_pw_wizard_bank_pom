<<<<<<< HEAD
import { expect } from "@playwright/test";
=======
import { expect } from '@playwright/test';
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
<<<<<<< HEAD
    this.customerNameField = page.getByPlaceholder("First Name");
    this.customerLastnameField = page.getByPlaceholder("Last Name");
    this.customerPostalCode = page.getByPlaceholder("Post Code");
    this.customerAddClick = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
    this.customerListClick = page.getByRole("button", { name: "Customers" });
    this.openAccountLink = page.getByRole("button", { name: "Open Account" });
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
  }

  async open() {
    await this.page.goto(
<<<<<<< HEAD
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
    await this.openAccountLink.click();
  }
=======
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
}
