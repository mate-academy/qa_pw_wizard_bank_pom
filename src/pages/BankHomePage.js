import { expect } from "@playwright/test";

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole("button", {
      name: "Customer Login",
    });
    this.bankManagerButton = page.getByRole("button", {
      name: "Bank Manager Login",
    });
    this.homeButton = page.getByRole("button", { name: "Home" });
    this.mainHeaderTitle = page.getByText("XYZ Bank");
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/login");
  }
  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }
  async clickBankManagerButton() {
    await this.bankManagerButton.click();
  }
  async assertHomeButtonIsVisible() {
    await expect(this.homeButton).toBeVisible();
  }
  async assertMainHeaderTitleIsVisible() {
    await expect(this.mainHeaderTitle).toBeVisible();
  }
}
