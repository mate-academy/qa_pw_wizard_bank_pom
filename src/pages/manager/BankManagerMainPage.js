import { expect } from "@playwright/test";

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer" });
    this.openAccountButton = page.getByRole("button", { name: "Open Account" });
    this.customersButton = page.getByRole("button", { name: "Customers" });
    this.homeButton = page.getByRole("button", { name: "Home" });
    this.mainHeaderTitle = page.getByText("XYZ Bank");
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager");
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
}
