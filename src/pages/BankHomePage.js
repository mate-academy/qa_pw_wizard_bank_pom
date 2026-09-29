import { expect } from "@playwright/test";

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.managerLoginButton = page.getByRole("button", {
      name: "Bank Manager Login",
    });
    this.managerAddButton = page.getByRole("button", {
      name: "Add Customer",
    });
    this.managerOpenButton = page.getByRole("button", {
      name: "Open Account",
    });
    this.managerCustomersButton = page.getByRole("button", {
      name: "Customers",
    });
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/login");
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }

  async visibleAddButton() {
    await expect(this.managerAddButton).toBeVisible();
  }

  async visibleOpenButton() {
    await expect(this.managerOpenButton).toBeVisible();
  }

  async visibleCustomerButton() {
    await expect(this.managerCustomersButton).toBeVisible();
  }
}
